import { MessageDto } from "src/dtos/message.dto";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { SessionRepository } from "src/repositories/session.repository";

export class HandleMessage{
    public handle(message: MessageDto){
        if(message.status != "RECEIVED"){
            return;
        }
        const content = message.content;
        const userNumber = message.from;
        
    }
}