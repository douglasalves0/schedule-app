import { MessageDto } from "src/dtos/message.dto";
import { Message } from "../interfaces/message.interface";
import { Saver } from "./save.session.message.method";
import { v4 as uuidv4 } from "uuid";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { sendMessage } from "src/api/moorse/send.message.api";
import { TypeEmail, WelcomeMessage } from "../strategies/strategies.constants";
import { OnlyNumbersAllowed } from "src/utils/constants";

export class HandleSyncAccount extends Saver implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4) {

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        

    }
}