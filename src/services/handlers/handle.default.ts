import { MessageDto } from "src/dtos/message.dto";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { WelcomeMessage } from '../strategies/strategies.constants';
import { Message } from "../interfaces/message.interface";
import { v4 as uuidv4} from 'uuid';
import { sendMessage } from "src/api/moorse/send.message.api";
import { Saver } from "./save.session.message.method";

export class DefaultHandler extends Saver implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4) {

        const sessionMessageRepo = new SessionMessageRepository;

        const userNumber = message.from;
        const botNumber = message.to;

        await this.saveMessage(botNumber, userNumber, WelcomeMessage, sessionId);
        sendMessage(userNumber, WelcomeMessage);
        
    }
}