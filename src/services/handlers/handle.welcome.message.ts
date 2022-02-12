import { MessageDto } from "src/dtos/message.dto";
import { Message } from "../interfaces/message.interface";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { SessionRepository } from "src/repositories/session.repository";
import { CreateNotificationMessage, OnlyNumbersAllowed } from "src/utils/constants";
import { v4 as uuidv4} from "uuid";
import { ScheduleRepository } from "src/repositories/schedule.repository";
import { ScheduleNotifyRepository } from "src/repositories/schedule.notify.repository";

export class HandleWelcomeMessage implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4){

        const sessionRepo = new SessionRepository;
        const sessionMessageRepo = new SessionMessageRepository;
        const scheduleRepo = new ScheduleRepository;
        const scheduleNotifyRepo = new ScheduleNotifyRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        await sessionMessageRepo.save({
            date: new Date,
            direction: 'in',
            from: userNumber,
            to: botNumber,
            message: userMessage,
            session_id: sessionId
        });

        const userOption = Number(userMessage);

        switch(userOption){
            case 1:
                var botMessage = "Mensagens agendadas:\n\n";
                const answer = await scheduleRepo.findPendingSchedulesBySessionId(sessionId);
                for(var i=0;i<answer.length;i++){
                    const idSchedule = answer[i].id;
                    const scheduleMessage = (await scheduleNotifyRepo.findByScheduleId(idSchedule))[0].message;
                    botMessage += "Código: " + answer[i].code + "\n";
                    botMessage += "Mensagem: " + scheduleMessage + "\n";
                    botMessage += "Agendada para: " + answer[i].date + "\n\n";
                }
                await sessionMessageRepo.save({
                    date: new Date,
                    direction: 'out',
                    from: botNumber,
                    to: userNumber,
                    message: botMessage,
                    session_id: sessionId
                });
                console.log(botMessage);
                break;
            case 2:        
                await sessionMessageRepo.save({
                    date: new Date,
                    direction: 'out',
                    from: botNumber,
                    to: userNumber,
                    message: CreateNotificationMessage,
                    session_id: sessionId
                });
                console.log("Mensagem do bot:\n" + CreateNotificationMessage);
                break;
            case 3:
                break;
            case 4:
                break;
            default:
                await sessionMessageRepo.save({
                    date: new Date,
                    direction: 'out',
                    from: botNumber,
                    to: userNumber,
                    message: OnlyNumbersAllowed,
                    session_id: sessionId
                });
                console.log("Mensagem do bot:\n" + OnlyNumbersAllowed);
                break;
            }

    }
}