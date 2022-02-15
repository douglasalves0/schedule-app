import { MessageDto } from "src/dtos/message.dto";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { DefaultHandler } from "./handlers/handle.default";
import { HandleNewSession } from "./handlers/handle.new.session";
import { SessionRepository } from "src/repositories/session.repository";
import { difTime } from "src/utils/functions";
import { execStrategy } from "./strategies/strategies";

export class HandleMessage{
    public async handle(message: MessageDto){

        //console.log(message);

        if(message.status != "RECEIVED" && message.status != "RESPONDIDA"){
            return;
        }

        const sessionMessageRepo = new SessionMessageRepository;
        const sessionRepo = new SessionRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        console.log(`New message: ${message.id}`);

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
        execStrategy(latest.message, sessionId, message);
   
    }
}