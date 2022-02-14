import { MessageDto } from "src/dtos/message.dto";
import { Message } from "../interfaces/message.interface";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { SessionRepository } from "src/repositories/session.repository";
import { v4 as uuidv4} from "uuid";
import { ScheduleRepository } from "src/repositories/schedule.repository";
import { ScheduleNotifyRepository } from "src/repositories/schedule.notify.repository";
import { DeletedSchedule, NotFoundSchedule } from "src/utils/constants";
import { sendMessage } from "src/api/send.message.api";

export class HandleWantedScheduleCode implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4){

        const sessionRepo = new SessionRepository;
        const sessionMessageRepo = new SessionMessageRepository;
        const scheduleRepo = new ScheduleRepository;
        const scheduleNotifyRepo = new ScheduleNotifyRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        const schedule = await scheduleRepo.findPendingSchedulesByCodeByUserNumber(userNumber, userMessage);       

        if(schedule == undefined){
            await sessionMessageRepo.save({
                date: new Date(),
                direction: "out",
                from: botNumber,
                to: userNumber,
                message: NotFoundSchedule,
                session_id: sessionId
            });
            //console.log(NotFoundSchedule);
            sendMessage(userNumber, NotFoundSchedule);
            return ;
        }

        await sessionMessageRepo.save({
            date: new Date(),
            direction: "out",
            from: botNumber,
            to: userNumber,
            message: DeletedSchedule,
            session_id: sessionId
        });
        //console.log(DeletedSchedule);
        sendMessage(userNumber, DeletedSchedule);
    }
}