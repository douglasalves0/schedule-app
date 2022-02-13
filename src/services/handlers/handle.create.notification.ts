import { MessageDto } from 'src/dtos/message.dto';
import { Message } from 'src/services/interfaces/message.interface';
import { v4 as uuidv4 } from 'uuid';
import { SessionMessageRepository } from 'src/repositories/session.message.repository';
import { ChoiceNotificationMessage, ValidDateNeeded } from 'src/utils/constants';
import { checkDate } from 'src/utils/functions';

export class HandleCreateNotification implements Message{
    public handle(message: MessageDto, sessionId: uuidv4) {
        
        const sessionMessageRepo = new SessionMessageRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const givenDate = message.content;

        const date = checkDate(givenDate);

        if(date == undefined){
            sessionMessageRepo.save({
                date: new Date(),
                direction: "out",
                from: botNumber,
                message: ValidDateNeeded,
                session_id: sessionId,
                to: userNumber
            });
            console.log("Mensagem do bot:\n" + ValidDateNeeded);
            return;
        }

        var now = new Date();
        var userDate = new Date(date);

        if(now >= userDate){
            console.log("aqui");
            sessionMessageRepo.save({
                date: new Date(),
                direction: "out",
                from: botNumber,
                message: ValidDateNeeded,
                session_id: sessionId,
                to: userNumber
            });
            console.log("Mensagem do bot:\n" + ValidDateNeeded);
            return;
        }

        sessionMessageRepo.save({
            date: new Date(),
            direction: "out",
            from: botNumber,
            message: ChoiceNotificationMessage,
            session_id: sessionId,
            to: userNumber
        });
        console.log("Mensagem do bot:\n" + ChoiceNotificationMessage);

    }
}