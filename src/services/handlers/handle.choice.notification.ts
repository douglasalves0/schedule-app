import { MessageDto } from 'src/dtos/message.dto';
import { Message } from 'src/services/interfaces/message.interface';
import { v4 as uuidv4 } from 'uuid';
import { SessionMessageRepository } from 'src/repositories/session.message.repository';
import { ConfirmNotificationMessage } from '../strategies/strategies.constants';
import { checkDate, delay, showDate } from 'src/utils/functions';
import { sendMessage } from "src/api/moorse/send.message.api";
import { Saver } from './save.session.message.method';

export class HandleChoiceNotification extends Saver implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4) {
        
        const sessionMessageRepo = new SessionMessageRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        var answer = await sessionMessageRepo.findKthLatestMessageFromUser(userNumber, 1);
        const userDateMessage = answer[0];
        const userWantedDate = new Date(checkDate(userDateMessage.message));
        var botMessage = `Informações da notificação:\n\nData: ${ showDate(userWantedDate) }\nMensagem: ${userMessage}\n\n`;

        await this.saveMessage(botNumber, userNumber, botMessage, sessionId);
        await delay(1);
        await this.saveMessage(botNumber, userNumber, ConfirmNotificationMessage, sessionId);

        sendMessage(userNumber, botMessage + ConfirmNotificationMessage);
    }

}