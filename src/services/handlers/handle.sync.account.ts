import { MessageDto } from "src/dtos/message.dto";
import { Message } from "../interfaces/message.interface";
import { Saver } from "./save.session.message.method";
import { v4 as uuidv4 } from "uuid";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { sendMessage } from "src/api/moorse/send.message.api";
import { ClickLink, WelcomeMessage } from "../strategies/strategies.constants";
import { OnlyNumbersAllowed } from "src/utils/constants";
import { url } from "src/api/google/google.oauth";

export class HandleSyncAccount extends Saver implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4) {

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        if(userMessage == "2"){
            await this.saveMessage(botNumber, userNumber, WelcomeMessage, sessionId);
            sendMessage(userNumber, WelcomeMessage);
            return ;
        }
        if(userMessage == "1"){
            await this.saveMessage(botNumber, userNumber, ClickLink + url + userNumber, sessionId);
            sendMessage(userNumber, ClickLink + url + userNumber);
            return ;
        }

        await this.saveMessage(botNumber, userNumber, OnlyNumbersAllowed, sessionId);
        sendMessage(userNumber, OnlyNumbersAllowed);

    }
}