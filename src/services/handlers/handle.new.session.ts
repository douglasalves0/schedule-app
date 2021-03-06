import { MessageDto } from "src/dtos/message.dto";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { SessionRepository } from "src/repositories/session.repository";
import { SyncAccount, WelcomeMessage } from '../strategies/strategies.constants';
import { Message } from "../interfaces/message.interface";
import { v4 as uuidv4} from 'uuid';
import { sendMessage } from "src/api/moorse/send.message.api";
import { Saver } from "./save.session.message.method";
import { GoogleCalendarDataRepository } from "src/repositories/google.calendar.data.repository";

export class HandleNewSession extends Saver implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4) {

        const sessionRepo = new SessionRepository;
        const sessionMessageRepo = new SessionMessageRepository;
	const googleCalendarDataRepo = new GoogleCalendarDataRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;
        var userName = message.contactUser.name;

        if(userName == undefined){
            userName = userNumber;
        }

        const newSessionId = await sessionRepo.save({
            wa_user: userNumber,
            started: new Date(),
            latest_message: new Date(),
            status: "in_progress"
        });
        
        await sessionMessageRepo.save({
            session_id: newSessionId,
            to: botNumber,
            from: userNumber,
            message: userMessage,
            direction: "in",
            date: new Date()
        });
        
        const greet = `Olá ${userName}, sou o MoorseBot, seu assistente virtual, em que posso te ajudar? 👨‍💻\n\n`;
 	const menu = (await googleCalendarDataRepo.isSynchronized(userNumber))?WelcomeMessage:SyncAccount;	
        
        await this.saveMessage(botNumber, userNumber, greet, newSessionId);
        await this.saveMessage(botNumber, userNumber, menu, newSessionId);
        
        sendMessage(userNumber, greet + menu);
    
    }
}
