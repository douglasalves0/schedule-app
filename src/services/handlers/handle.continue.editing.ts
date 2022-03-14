import { MessageDto } from 'src/dtos/message.dto';
import { Message } from 'src/services/interfaces/message.interface';
import { v4 as uuidv4 } from 'uuid';
import { SessionMessageRepository } from 'src/repositories/session.message.repository';

import { TypeNewDate } from '../strategies/strategies.constants';
import { OnlyNumbersAllowed, OperationCanceled } from 'src/utils/constants';
import { sendMessage } from "src/api/moorse/send.message.api";
import { Saver } from './save.session.message.method';

export class HandleContinueEditing extends Saver implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4) {
        
        const sessionMessageRepo = new SessionMessageRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        if(userMessage == "2"){
            await this.saveMessage(botNumber, userNumber, OperationCanceled, sessionId);
            sendMessage(userNumber, OperationCanceled);
            return ;
        }
        if(userMessage == "1"){
            await this.saveMessage(botNumber, userNumber, TypeNewDate, sessionId);
            sendMessage(userNumber, TypeNewDate);
            return ;
        }
        
        this.saveMessage(botNumber, userNumber, OnlyNumbersAllowed, sessionId);
        sendMessage(userNumber, OnlyNumbersAllowed);
    }
}