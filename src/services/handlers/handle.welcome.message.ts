import { MessageDto } from "src/dtos/message.dto";
import { Message } from "../interfaces/message.interface";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { SessionRepository } from "src/repositories/session.repository";
import { CreateNotificationMessage, OnlyNumbersAllowed } from "src/utils/constants";
import { v4 as uuidv4} from "uuid";

export class HandleWelcomeMessage implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4){

        const sessionRepo = new SessionRepository;
        const sessionMessageRepo = new SessionMessageRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        sessionMessageRepo.save({
            date: new Date,
            direction: 'in',
            from: userNumber,
            to: botNumber,
            message: userMessage,
            session_id: sessionId
        });
        
        if(isNaN(Number(userMessage))){
            sessionMessageRepo.save({
                date: new Date,
                direction: 'out',
                from: botNumber,
                to: userNumber,
                message: OnlyNumbersAllowed,
                session_id: sessionId
            });
            console.log("Mensagem do bot:\n" + OnlyNumbersAllowed);
            return;
        }

        const userOption = Number(userMessage);

        switch(userOption){
            case 1:
                break;
            case 2:
                sessionMessageRepo.save({
                    date: new Date,
                    direction: 'out',
                    from: botNumber,
                    to: userNumber,
                    message: OnlyNumbersAllowed,
                    session_id: sessionId
                });
                console.log("Mensagem do bot:\n" + OnlyNumbersAllowed);
                break;
            case 3:
                break;
            case 4:
                break;
            default:
                break;
        }

        sessionMessageRepo.save({
            date: new Date,
            direction: 'out',
            from: botNumber,
            to: userNumber,
            message: CreateNotificationMessage,
            session_id: sessionId
        });

        console.log("Mensagem do bot:\n" + CreateNotificationMessage);

    }
}