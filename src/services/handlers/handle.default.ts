import { MessageDto } from "src/dtos/message.dto";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { WelcomeMessage } from "src/utils/constants";
import { Message } from "../interfaces/message.interface";
import { v4 as uuidv4} from 'uuid';

export class DefaultHandler implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4) {

        const sessionMessageRepo = new SessionMessageRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        const sessionMessageBot = await sessionMessageRepo.save({
            session_id: sessionId,
            to: userNumber,
            from: botNumber,
            message: WelcomeMessage,
            direction: "out",
            date: new Date()
        });
        const sessionMessageUser = await sessionMessageRepo.save({
            session_id: sessionId,
            to: botNumber,
            from: userNumber,
            message: userMessage,
            direction: "in",
            date: new Date()
        });
        console.log("Mensagem enviada pelo bot:\n" + WelcomeMessage);
   
    }
}