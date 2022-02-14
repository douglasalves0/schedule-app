import { MessageDto } from 'src/dtos/message.dto';
import { Message } from 'src/services/interfaces/message.interface';
import { v4 as uuidv4 } from 'uuid';
import { SessionMessageRepository } from 'src/repositories/session.message.repository';
import { OnlyNumbersAllowed, OperationCanceled, TypeNewDate } from 'src/utils/constants';
import { checkDate } from 'src/utils/functions';
import { sendMessage } from 'src/api/send.message.api';

export class HandleContinueEditing implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4) {
        
        const sessionMessageRepo = new SessionMessageRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        if(userMessage == "2"){
            await sessionMessageRepo.save({
                date: new Date(),
                direction: "out",
                from: botNumber,
                to: userNumber,
                message: OperationCanceled,
                session_id: sessionId
            });
            sendMessage(userNumber, OperationCanceled);
            //console.log("Mensagem do bot: " + OperationCanceled);
            return ;
        }else if(userMessage == "1"){
            await sessionMessageRepo.save({
                date: new Date(),
                direction: "out",
                from: botNumber,
                to: userNumber,
                message: TypeNewDate,
                session_id: sessionId
            });
            //console.log("Mensagem do bot: " + TypeNewDate);
            sendMessage(userNumber, TypeNewDate);
            return ;
        }

        await sessionMessageRepo.save({
            date: new Date(),
            direction: "out",
            from: botNumber,
            to: userNumber,
            message: OnlyNumbersAllowed,
            session_id: sessionId
        });
        //console.log("Mensagem do bot: " + OnlyNumbersAllowed);
        sendMessage(userNumber, OnlyNumbersAllowed);
    }
}