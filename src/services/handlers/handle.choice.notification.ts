import { MessageDto } from 'src/dtos/message.dto';
import { Message } from 'src/services/interfaces/message.interface';
import { v4 as uuidv4 } from 'uuid';
import { SessionMessageRepository } from 'src/repositories/session.message.repository';
import { ConfirmNotificationMessage } from 'src/utils/constants';
import { checkDate, delay, showDate } from 'src/utils/functions';
import { sendMessage } from 'src/api/send.message.api';

export class HandleChoiceNotification implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4) {
        
        const sessionMessageRepo = new SessionMessageRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        var answer = await sessionMessageRepo.findKthLatestMessageFromUser(userNumber, 1);
        const userDateMessage = answer[0];
        const userWantedDate = new Date(checkDate(userDateMessage.message));
        var botMessage = `Informações da notificação:\nData: ${ showDate(userWantedDate) }\nMensagem: ${userMessage}`;

        await sessionMessageRepo.save({
            date: new Date(),
            direction: "out",
            from: botNumber,
            to: userNumber,
            message: botMessage,
            session_id: sessionId
        });

        await delay(1);

        await sessionMessageRepo.save({
            date: new Date(),
            direction: "out",
            from: botNumber,
            to: userNumber,
            message: ConfirmNotificationMessage,
            session_id: sessionId
        });

        //console.log("Mensagem do bot:\n" + botMessage);
        //console.log("Mensagem do bot:\n" + ConfirmNotificationMessage);
        sendMessage(userNumber, botMessage);
        sendMessage(userNumber, ConfirmNotificationMessage);
    }

}