import { sendMessage } from "src/api/send.message.api";
import { ScheduleNotifyRepository } from "src/repositories/schedule.notify.repository";
import { ScheduleRepository } from "src/repositories/schedule.repository";
import { SessionRepository } from "src/repositories/session.repository";
import { showDate } from "src/utils/functions";

export async function handleJob(){

    console.log(`Initializing scheduler at ${showDate(new Date())}:00 ...`);

    const scheduleRepo = new ScheduleRepository;
    const scheduleNotifyRepo = new ScheduleNotifyRepository;
    const sessionRepo = new SessionRepository;

    const schedules = await scheduleRepo.findSchedulesEarlierThanNow();
    for(var i=0;i<schedules.length;i++){
        const schedule = schedules[i];
        const scheduleId = schedule.id;
        const scheduleNotify = (await scheduleNotifyRepo.findByScheduleId(scheduleId))[0];
        const userNumber = scheduleNotify.notify_number;
        const message = scheduleNotify.message;
        console.log(`Sending message to ${userNumber} of schedule ${scheduleId}...`);
        sendMessage(userNumber, "*Notificação da Moorse 👨‍💻*\n\n"+message);
        scheduleRepo.markAsExecutedSchedulesEarlierThanNow(scheduleId);
    }
    
    sessionRepo.closeOldSessions(); 

}