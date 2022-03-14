import { MessageDto } from 'src/dtos/message.dto';
import { Message } from 'src/services/interfaces/message.interface';
import { v4 as uuidv4 } from 'uuid';
import { SessionMessageRepository } from 'src/repositories/session.message.repository';
import { ChoiceNotificationMessage } from '../strategies/strategies.constants';
import { ValidDateNeeded } from 'src/utils/constants';
import { checkDate } from 'src/utils/functions';
import { sendMessage } from "src/api/moorse/send.message.api";
import { Saver } from './save.session.message.method';

export class HandleCreateNotification extends Saver implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4) {
        
        const sessionMessageRepo = new SessionMessageRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const givenDate = message.content;

        const date = checkDate(givenDate);

        if(date == undefined){
            await this.saveMessage(botNumber, userNumber, ValidDateNeeded, sessionId);
            sendMessage(userNumber, ValidDateNeeded);
            return;
        }

        var now = new Date();
        var userDate = new Date(date);

        if(now >= userDate){
            await this.saveMessage(botNumber, userNumber, ValidDateNeeded, sessionId);
            sendMessage(userNumber, ValidDateNeeded);
            return;
        }

        await this.saveMessage(botNumber, userNumber, ChoiceNotificationMessage, sessionId);
        sendMessage(userNumber, ChoiceNotificationMessage);
    }
}