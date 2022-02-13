import { MessageDto } from 'src/dtos/message.dto';
import { Message } from 'src/services/interfaces/message.interface';
import { v4 as uuidv4 } from 'uuid';
import { SessionMessageRepository } from 'src/repositories/session.message.repository';
import { CreateNotificationMessage, OnlyNumbersAllowed, SucessSchedule } from 'src/utils/constants';
import { ScheduleRepository } from 'src/repositories/schedule.repository';
import { ScheduleNotifyRepository } from 'src/repositories/schedule.notify.repository';
import { getCode, checkDate } from 'src/utils/functions';

export class HandleConfirmNotification implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4) {
        
        const sessionMessageRepo = new SessionMessageRepository;
        const scheduleRepo = new ScheduleRepository;
        const scheduleNotifyRepo = new ScheduleNotifyRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        const userDateMessage = (await sessionMessageRepo.findKthLatestMessageFromUser(userNumber, 2))[0].message;
        const userNotifyMessage = (await sessionMessageRepo.findKthLatestMessageFromUser(userNumber, 1))[0].message;

        if(userMessage == "2"){
            await sessionMessageRepo.save({
                date: new Date(),
                direction: "out",
                from: botNumber,
                to: userNumber,
                message: CreateNotificationMessage,
                session_id: sessionId
            });
            console.log("Mensagem do bot: " + CreateNotificationMessage);
            return ;
        }else if(userMessage == "1"){
            await sessionMessageRepo.save({
                date: new Date(),
                direction: "out",
                from: botNumber,
                to: userNumber,
                message: SucessSchedule,
                session_id: sessionId
            });
            const scheduleId = await scheduleRepo.save({
                created: new Date(),
                updated: new Date(),
                date: new Date(checkDate(userDateMessage)),
                error:"",
                session_id: sessionId,
                status: "pending",
                type: "notify",
                code: getCode()
            });
            await scheduleNotifyRepo.save({
                message: userNotifyMessage,
                notify_number: userNumber,
                schedule_id: scheduleId
            });
            console.log("Mensagem do bot: " + SucessSchedule);
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
        console.log("Mensagem do bot: " + OnlyNumbersAllowed);

    }

}