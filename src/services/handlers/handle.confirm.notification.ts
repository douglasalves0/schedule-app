import { MessageDto } from 'src/dtos/message.dto';
import { Message } from 'src/services/interfaces/message.interface';
import { v4 as uuidv4 } from 'uuid';
import { SessionMessageRepository } from 'src/repositories/session.message.repository';
import { ConfirmNotificationMessage, CreateNotificationMessage, SucessSchedule } from 'src/utils/constants';
import { ignoreElements } from 'rxjs';

export class HandleConfirmNotification implements Message{
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

        if(userMessage == "2"){
            sessionMessageRepo.save({
                date: new Date(),
                direction: "out",
                from: botNumber,
                to: userNumber,
                message: CreateNotificationMessage,
                session_id: sessionId
            });
            console.log("Mensagem do bot: " + CreateNotificationMessage);
        }else if(userMessage == "1"){
            sessionMessageRepo.save({
                date: new Date(),
                direction: "out",
                from: botNumber,
                to: userNumber,
                message: SucessSchedule,
                session_id: sessionId
            });
            //salvar esse agendamento no banco de dados
            console.log("Mensagem do bot: " + SucessSchedule);
        }

    }

}