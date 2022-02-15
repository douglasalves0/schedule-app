import { MessageDto } from "src/dtos/message.dto";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { SessionRepository } from "src/repositories/session.repository";
import { WelcomeMessage } from '../strategies/strategies.constants';
import { Message } from "../interfaces/message.interface";
import { v4 as uuidv4} from 'uuid';
import { sendMessage } from "src/api/send.message.api";

export class HandleNewSession implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4) {

        const sessionRepo = new SessionRepository;
        const sessionMessageRepo = new SessionMessageRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        const newSessionId = await sessionRepo.save({
            wa_user: userNumber,
            started: new Date(),
            latest_message: new Date(),
            status: "in_progress"
        });
        await sessionMessageRepo.save({
            session_id: newSessionId,
            to: botNumber,
            from: userNumber,
            message: userMessage,
            direction: "in",
            date: new Date()
        });
        await sessionMessageRepo.save({
            session_id: newSessionId,
            to: userNumber,
            from: botNumber,
            message: WelcomeMessage,
            direction: "out",
            date: new Date()
        });
        //console.log("Mensagem enviada pelo bot:\n" + WelcomeMessage);
        sendMessage(userNumber, WelcomeMessage);
    }
}