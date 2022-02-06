import { MessageDto } from "src/dtos/message.dto";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { ChoiceNotificationMessage, ConfirmNotificationMessage, CreateNotificationMessage, WelcomeMessage } from "src/utils/constants";
import { CreateNotificationHandler } from "./handlers/handle.create.notification";
import { DefaultHandler } from "./handlers/handle.default";
import { HandleNewSession } from "./handlers/handle.new.session";
import { HandleWelcomeMessage } from "./handlers/handle.welcome.message";

export class HandleMessage{
    public async handle(message: MessageDto){

        if(message.status != "RECEIVED"){
            return;
        }

        const sessionMessageRepo = new SessionMessageRepository;
        const userNumber = message.from;

        const answer = await sessionMessageRepo.findLatestBotMessage(userNumber);

        const now = new Date();
        const MilissecondsDifference = now.getTime() - answer.date.getTime();

        if(MilissecondsDifference/1000/60 > 60){
            const newSession = new HandleNewSession;
            newSession.handle(message, 'aaaa');
            return;
        }

        const sessionId = answer.session_id;

        switch (answer.message){
            case WelcomeMessage:
                const welcomeHandler = new HandleWelcomeMessage;
                welcomeHandler.handle(message, sessionId);
                break;
            case CreateNotificationMessage:
                console.log("entrou");
                const createNotificationHandler = new CreateNotificationHandler();
                createNotificationHandler.handle(message, sessionId);
                break;
            case ChoiceNotificationMessage:
                break;
            case ConfirmNotificationMessage:
                break;
            default:
                const defaultHandler = new DefaultHandler();
                defaultHandler.handle(message, sessionId);
                break;
        }
   
    }
}