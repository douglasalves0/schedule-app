import { MessageDto } from 'src/dtos/message.dto';
import { Message } from 'src/services/interfaces/message.interface';
import { v4 as uuidv4 } from 'uuid';
import { SessionMessageRepository } from 'src/repositories/session.message.repository';
import { ConfirmNotificationMessage } from 'src/utils/constants';
import { checkDate } from 'src/utils/functions';

export class HandleChoiceNotification implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4) {
        
        const sessionMessageRepo = new SessionMessageRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        await sessionMessageRepo.save({
            date: new Date(),
            direction: "in",
            from: userNumber,
            message: userMessage,
            session_id: sessionId,
            to: botNumber
        });

        var answer = await sessionMessageRepo.findKthLatestMessageFromUser(userNumber, 1);
        const userDateMessage = answer[0];
        const userWantedDate = new Date(checkDate(userDateMessage.message));
        var botMessage = `Informações da notificação:\nData: ${userWantedDate.toLocaleString()}\nMensagem: ${userMessage}`;

        sessionMessageRepo.save({
            date: new Date(),
            direction: "out",
            from: botNumber,
            to: userNumber,
            message: botMessage,
            session_id: sessionId
        });

        sessionMessageRepo.save({
            date: new Date(),
            direction: "out",
            from: botNumber,
            to: userNumber,
            message: ConfirmNotificationMessage,
            session_id: sessionId
        });

        console.log("Mensagem do bot:\n" + botMessage);
        console.log("Mensagem do bot:\n" + ConfirmNotificationMessage);

    }

}