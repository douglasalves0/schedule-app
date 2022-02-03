import { MessageDto } from "src/dtos/message.dto";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { SessionRepository } from "src/repositories/session.repository";
import { WelcomeMessage } from "src/utils/constants";
import { Message } from "../interfaces/message.interface";

export class HandleNewSession implements Message{
    public async handle(message: MessageDto) {
        
        const sessionRepo = new SessionRepository;
        const sessionMessageRepo = new SessionMessageRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        const session = await sessionRepo.save({
            waUser: userNumber,
            started: new Date(),
            latestMessage: new Date(),
            status: "in_progress"
        });
        const sessionMessageBot = await sessionMessageRepo.save({
            sessionId: session.id,
            to: userNumber,
            from: botNumber,
            message: WelcomeMessage,
            direction: "out",
            date: new Date()
        });
        const sessionMessageUser = await sessionMessageRepo.save({
            sessionId: session.id,
            to: botNumber,
            from: userNumber,
            message: userMessage,
            direction: "in",
            date: new Date()
        });
        console.log(WelcomeMessage);
    
    }
}