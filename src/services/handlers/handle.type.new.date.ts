import { MessageDto } from 'src/dtos/message.dto';
import { Message } from 'src/services/interfaces/message.interface';
import { v4 as uuidv4 } from 'uuid';
import { SessionMessageRepository } from 'src/repositories/session.message.repository';
import { TypeNewMessage, ValidDateNeeded } from 'src/utils/constants';
import { checkDate } from 'src/utils/functions';
import { sendMessage } from 'src/api/send.message.api';

export class HandleTypeNewDate implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4) {

        const sessionMessageRepo = new SessionMessageRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const givenDate = message.content;

        const date = checkDate(givenDate);

        if(date == undefined){
            await sessionMessageRepo.save({
                date: new Date(),
                direction: "out",
                from: botNumber,
                message: ValidDateNeeded,
                session_id: sessionId,
                to: userNumber
            });
            sendMessage(userNumber, ValidDateNeeded);
            //console.log("Mensagem do bot:\n" + ValidDateNeeded);
            return;
        }

        var now = new Date();
        var userDate = new Date(date);

        if(now >= userDate){
            await sessionMessageRepo.save({
                date: new Date(),
                direction: "out",
                from: botNumber,
                message: ValidDateNeeded,
                session_id: sessionId,
                to: userNumber
            });
            //console.log("Mensagem do bot:\n" + ValidDateNeeded);
            sendMessage(userNumber, ValidDateNeeded);
            return;
        }

        await sessionMessageRepo.save({
            date: new Date(),
            direction: "out",
            from: botNumber,
            message: TypeNewMessage,
            session_id: sessionId,
            to: userNumber
        });
        sendMessage(userNumber, TypeNewMessage);
        //console.log("Mensagem do bot:\n" + TypeNewMessage);

    }
}