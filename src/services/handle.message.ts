import { MessageDto } from "src/dtos/message.dto";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { SessionRepository } from "src/repositories/session.repository";
import { WelcomeMessage } from "src/utils/consts";

export class HandleMessage{
    public async handle(message: MessageDto){

        if(message.status != "RECEIVED"){
            return;
        }

        const sessionMessageRepo = new SessionMessageRepository;
        const sessionRepo = new SessionRepository;

        const userMessage = message.content;
        const userNumber = message.from;
        const botNumber = message.to;

        const answer = await sessionMessageRepo.findLatestBotMessage(userNumber);
        
        const now = new Date();
        const MilissecondsDifference = now.getTime() - answer.date.getTime();
        
        if(MilissecondsDifference/1000/60 > 60){
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
            return;
        }
        console.log("outra mensagem")
    }
}