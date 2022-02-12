import { MessageDto } from "src/dtos/message.dto";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { ChoiceNotificationMessage, ConfirmNotificationMessage, CreateNotificationMessage, WelcomeMessage } from "src/utils/constants";
import { HandleCreateNotification } from "./handlers/handle.create.notification";
import { DefaultHandler } from "./handlers/handle.default";
import { HandleNewSession } from "./handlers/handle.new.session";
import { HandleWelcomeMessage } from "./handlers/handle.welcome.message";
import { HandleChoiceNotification } from "./handlers/handle.choice.notification";
import { HandleConfirmNotification } from "./handlers/handle.confirm.notification";

export class HandleMessage{
    public async handle(message: MessageDto){

        if(message.status != "RECEIVED"){
            return;
        }

        const sessionMessageRepo = new SessionMessageRepository;
        const userNumber = message.from;

        const answer = await sessionMessageRepo.findKthLatestMessageToUser(userNumber, 0);

        if(answer.length == 0){
            const newSession = new HandleNewSession;
            newSession.handle(message, undefined);
            return;
        }

        const latest = answer[0];

        const sessionId = latest.session_id;

        const defaultHandler = new DefaultHandler();
        const welcomeHandler = new HandleWelcomeMessage;
        const createNotificationHandler = new HandleCreateNotification();
        const choiceNotificationHandler = new HandleChoiceNotification();
        const confirmNotificationHangler = new HandleConfirmNotification();

        switch (latest.message){
            case WelcomeMessage:
                await welcomeHandler.handle(message, sessionId);
                break;
            case CreateNotificationMessage:
                await createNotificationHandler.handle(message, sessionId);
                break;
            case ChoiceNotificationMessage:
                await choiceNotificationHandler.handle(message, sessionId);
                break;
            case ConfirmNotificationMessage:
                await confirmNotificationHangler.handle(message, sessionId);
                break;
            default:
                console.log("Tratamento padrão");
                await defaultHandler.handle(message, sessionId);
                break;
        }
   
    }
}