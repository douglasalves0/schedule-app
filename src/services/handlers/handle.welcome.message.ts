import { MessageDto } from "src/dtos/message.dto";
import { Message } from "../interfaces/message.interface";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { SessionRepository } from "src/repositories/session.repository";
import { CreateNotificationMessage, NeedScheduleCode, OnlyNumbersAllowed, WantedScheduleCode } from "src/utils/constants";
import { v4 as uuidv4} from "uuid";
import { ScheduleRepository } from "src/repositories/schedule.repository";
import { ScheduleNotifyRepository } from "src/repositories/schedule.notify.repository";
import { showDate } from "src/utils/functions";
import { sendMessage } from "src/api/send.message.api";

export class HandleWelcomeMessage implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4){

        const sessionRepo = new SessionRepository;
        const sessionMessageRepo = new SessionMessageRepository;
        const scheduleRepo = new ScheduleRepository;
        const scheduleNotifyRepo = new ScheduleNotifyRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

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
                    botMessage += "Agendada para: " + showDate(answer[i].date) + "\n\n";
                }
                await sessionMessageRepo.save({
                    date: new Date,
                    direction: 'out',
                    from: botNumber,
                    to: userNumber,
                    message: botMessage,
                    session_id: sessionId
                });
                //console.log(botMessage);
                sendMessage(userNumber, botMessage);
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
                //console.log("Mensagem do bot:\n" + CreateNotificationMessage);
                sendMessage(userNumber, CreateNotificationMessage);
                break;
            case 3:
                await sessionMessageRepo.save({
                    date: new Date,
                    direction: 'out',
                    from: botNumber,
                    to: userNumber,
                    message: NeedScheduleCode,
                    session_id: sessionId
                });
                //console.log("Mensagem do bot:\n" + NeedScheduleCode);
                sendMessage(userNumber, NeedScheduleCode);
                break;
            case 4:
                await sessionMessageRepo.save({
                    date: new Date,
                    direction: 'out',
                    from: botNumber,
                    to: userNumber,
                    message: WantedScheduleCode,
                    session_id: sessionId
                });
                //console.log("Mensagem do bot:\n" + WantedScheduleCode);
                sendMessage(userNumber, WantedScheduleCode);
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
                //console.log("Mensagem do bot:\n" + OnlyNumbersAllowed);
                sendMessage(userNumber, OnlyNumbersAllowed);
                break;
            }

    }
}