import { MessageDto } from "src/dtos/message.dto";
import { Message } from "../interfaces/message.interface";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { SessionRepository } from "src/repositories/session.repository";
import { OnlyNumbersAllowed } from "src/utils/constants";

export class HandleWelcomeMessage implements Message{
    public async handle(message: MessageDto){

        const sessionRepo = new SessionRepository;
        const sessionMessageRepo = new SessionMessageRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        if(isNaN(Number(userMessage))){
            console.log(OnlyNumbersAllowed);
            return;
        }

        const userOption = Number(userMessage);

        if(userOption < 1 || userOption > 4){
            
        }

    }
}