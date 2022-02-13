import { MessageDto } from "src/dtos/message.dto";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { ChoiceNotificationMessage, ConfirmNotificationMessage, ContinueEditing, CreateNotificationMessage, NeedScheduleCode, TypeNewDate, WelcomeMessage, TypeNewMessage } from "src/utils/constants";
import { HandleCreateNotification } from "./handlers/handle.create.notification";
import { DefaultHandler } from "./handlers/handle.default";
import { HandleNewSession } from "./handlers/handle.new.session";
import { HandleWelcomeMessage } from "./handlers/handle.welcome.message";
import { HandleChoiceNotification } from "./handlers/handle.choice.notification";
import { HandleConfirmNotification } from "./handlers/handle.confirm.notification";
import { SessionRepository } from "src/repositories/session.repository";
import { difTime } from "src/utils/functions";
import { HandleNeedScheduleCode } from "./handlers/handle.need.schedule.code";
import { HandleContinueEditing } from "./handlers/handle.continue.editing";
import { HandleTypeNewDate } from "./handlers/handle.type.new.date";
import { HandleTypeNewMessage } from "./handlers/handle.type.new.message";

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
            date: new Date(),
            direction: 'in',
            from: userNumber,
            to: botNumber,
            message: userMessage,
            session_id: sessionId
        });

        await sessionRepo.updateDateById(sessionId);
        
        const welcomeHandler = new HandleWelcomeMessage;
        
        const defaultHandler = new DefaultHandler();
        const createNotificationHandler = new HandleCreateNotification();
        const choiceNotificationHandler = new HandleChoiceNotification();
        const confirmNotificationHandler = new HandleConfirmNotification();

        const needScheduleCodeHandler = new HandleNeedScheduleCode;
        const ContinueEditingHandler = new HandleContinueEditing;
        const typeNewDateHandler = new HandleTypeNewDate;
        const typeNewMessageHandler = new HandleTypeNewMessage;

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
                confirmNotificationHandler.handle(message, sessionId);
                break;

            case NeedScheduleCode:
                needScheduleCodeHandler.handle(message, sessionId);
                break;
            case ContinueEditing:
                ContinueEditingHandler.handle(message, sessionId);
                break;
            case TypeNewDate:
                typeNewDateHandler.handle(message, sessionId);
                break;
            case TypeNewMessage:
                typeNewMessageHandler.handle(message, sessionId);
                break;

            default:
                defaultHandler.handle(message, sessionId);
                break;
        }
   
    }
}