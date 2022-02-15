import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { v4 as uuidv4 } from "uuid";

export abstract class Saver {
    async saveMessage(botNumber: string, userNumber: string, message: string, sessionId: uuidv4): Promise<void>{
        const saver = new SessionMessageRepository;
        saver.save({
            session_id: sessionId,
            to: userNumber,
            from: botNumber,
            message: message,
            direction: "out",
            date: new Date()
        });
    }
}