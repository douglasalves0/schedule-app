import { MessageDto } from "src/dtos/message.dto";
import { Message } from "../interfaces/message.interface";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { v4 as uuidv4} from "uuid";
import { ScheduleRepository } from "src/repositories/schedule.repository";
import { ConfirmNotificationMessage, NotFoundSchedule } from "src/utils/constants";
import { ScheduleNotifyRepository } from "src/repositories/schedule.notify.repository";
import { delay } from "src/utils/functions";

export class HandleNeedScheduleCode implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4){

        const sessionMessageRepo = new SessionMessageRepository;
        const scheduleRepo = new ScheduleRepository;
        const scheduleNotifyRepo = new ScheduleNotifyRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        const schedule = await scheduleRepo.findPendingSchedulesByCodeByUserNumber(userNumber, userMessage);
        
        if(schedule == undefined){
            await sessionMessageRepo.save({
                date: new Date,
                direction: 'out',
                from: botNumber,
                to: userNumber,
                message: NotFoundSchedule,
                session_id: sessionId
            });
            console.log(NotFoundSchedule);
            return;
        }

        const scheduledMessage = (await scheduleNotifyRepo.findByScheduleId(schedule.id))[0].message;
        var botMessage = "";
        botMessage += "Agendamento encontrado:\n\n";
        botMessage += "Mensagem: " + scheduledMessage + "\n";
        botMessage += "Data: " + schedule.date + "\n";

        await sessionMessageRepo.save({
            date: new Date,
            direction: 'out',
            from: botNumber,
            to: userNumber,
            message: botMessage,
            session_id: sessionId
        });

        await delay(1);

        await sessionMessageRepo.save({
            date: new Date,
            direction: 'out',
            from: botNumber,
            to: userNumber,
            message: ConfirmNotificationMessage,
            session_id: sessionId
        });

        console.log(NotFoundSchedule);
        return;

    }
}