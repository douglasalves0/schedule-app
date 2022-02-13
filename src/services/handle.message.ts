import { MessageDto } from "src/dtos/message.dto";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { ChoiceNotificationMessage, ConfirmNotificationMessage, CreateNotificationMessage, NeedScheduleCode, WelcomeMessage } from "src/utils/constants";
import { HandleCreateNotification } from "./handlers/handle.create.notification";
import { DefaultHandler } from "./handlers/handle.default";
import { HandleNewSession } from "./handlers/handle.new.session";
import { HandleWelcomeMessage } from "./handlers/handle.welcome.message";
import { HandleChoiceNotification } from "./handlers/handle.choice.notification";
import { HandleConfirmNotification } from "./handlers/handle.confirm.notification";
import { SessionRepository } from "src/repositories/session.repository";
import { difTime } from "src/utils/functions";

export class HandleMessage{
    public async handle(message: MessageDto){

        if(message.status != "RECEIVED"){
            return;
        }

        const sessionMessageRepo = new SessionMessageRepository;
        const sessionRepo = new SessionRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        const answer = await sessionMessageRepo.findKthLatestMessageToUser(userNumber, 0);

        if(answer.length == 0){
            const newSession = new HandleNewSession;
            newSession.handle(message, undefined);
            return;
        }

        const now = new Date();
        const lastMessage = answer[0].date;

        if(difTime(now, lastMessage) > 60){
            const newSession = new HandleNewSession;
            newSession.handle(message, undefined);
            return;
        }

        const latest = answer[0];
        const sessionId = latest.session_id;

        await sessionMessageRepo.save({
            date: new Date,
            direction: 'in',
            from: userNumber,
            to: botNumber,
            message: userMessage,
            session_id: sessionId
        });

        await sessionRepo.updateDateById(sessionId);

        const defaultHandler = new DefaultHandler();
        const welcomeHandler = new HandleWelcomeMessage;
        const createNotificationHandler = new HandleCreateNotification();
        const choiceNotificationHandler = new HandleChoiceNotification();
        const confirmNotificationHangler = new HandleConfirmNotification();

        switch (latest.message){
            case WelcomeMessage:
                welcomeHandler.handle(message, sessionId);
                break;
            case CreateNotificationMessage:
                createNotificationHandler.handle(message, sessionId);
                break;
            case ChoiceNotificationMessage:
                choiceNotificationHandler.handle(message, sessionId);
                break;
            case ConfirmNotificationMessage:
                confirmNotificationHangler.handle(message, sessionId);
                break;
            case NeedScheduleCode:
                 ;
                break;
            default:
                console.log("Tratamento padrão");
                defaultHandler.handle(message, sessionId);
                break;
        }
   
    }
}