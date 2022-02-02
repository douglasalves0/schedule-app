import { MessageDto } from "src/dtos/message.dto";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { HandleNewSession } from "./handle.new.session";

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
            newSession.handle(message);
            return;
        }

        console.log("outra mensagem")
    
    }
}