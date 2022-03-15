import { MessageDto } from "src/dtos/message.dto";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { GoogleCalendarDataRepository } from "src/repositories/google.calendar.data.repository";
import { WelcomeMessage, SyncAccount } from '../strategies/strategies.constants';
import { Message } from "../interfaces/message.interface";
import { v4 as uuidv4} from 'uuid';
import { sendMessage } from "src/api/moorse/send.message.api";
import { Saver } from "./save.session.message.method";

export class DefaultHandler extends Saver implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4) {

        const sessionMessageRepo = new SessionMessageRepository;
        const googleCalendarDataRepo = new GoogleCalendarDataRepository;

        const userNumber = message.from;
        const botNumber = message.to;

        if(await googleCalendarDataRepo.isSynchronized(userNumber)){
            await this.saveMessage(botNumber, userNumber, WelcomeMessage, sessionId);
            sendMessage(userNumber, WelcomeMessage);
            return;
        }

        await this.saveMessage(botNumber, userNumber, SyncAccount, sessionId);
        sendMessage(userNumber, SyncAccount);

    }
}