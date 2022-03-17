import { MessageDto } from "src/dtos/message.dto";
import { Message } from "../interfaces/message.interface";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { v4 as uuidv4} from "uuid";
import { ScheduleRepository } from "src/repositories/schedule.repository";
import { ContinueEditing } from '../strategies/strategies.constants';
import { NotFoundSchedule } from "src/utils/constants";
import { ScheduleNotifyRepository } from "src/repositories/schedule.notify.repository";
import { delay, showDate, getAuth, configureCalendar } from "src/utils/functions";
import { sendMessage } from "src/api/moorse/send.message.api";
import { Saver } from "./save.session.message.method";
import { GoogleCalendarDataRepository } from "src/repositories/google.calendar.data.repository";

export class HandleNeedScheduleCode extends Saver implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4){

        const sessionMessageRepo = new SessionMessageRepository;
        const scheduleRepo = new ScheduleRepository;
        const scheduleNotifyRepo = new ScheduleNotifyRepository;
        const googleCalendarDataRepo = new GoogleCalendarDataRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        var scheduledMessage:string;
        var scheduledDate:Date;

        if(await googleCalendarDataRepo.isSynchronized(userNumber)){
            const refreshToken = (await googleCalendarDataRepo.findByUserNumber(userNumber))[0].refresh_token;
            const auth = await getAuth(refreshToken);
            const calendar = await configureCalendar(auth);
            try{
            	const event = await calendar.events.get({
		    eventId: userMessage,
		    calendarId: "primary"
            	});
            	scheduledDate = new Date(event.data.start.dateTime); 
            	scheduledMessage = event.data.summary;
            }catch{
            	await this.saveMessage(botNumber, userNumber, NotFoundSchedule, sessionId);
                sendMessage(userNumber, NotFoundSchedule);
                return;
            }
        }else{
            const schedule = await scheduleRepo.findPendingSchedulesByCodeByUserNumber(userNumber, userMessage);
            if(schedule == undefined){
                await this.saveMessage(botNumber, userNumber, NotFoundSchedule, sessionId);
                sendMessage(userNumber, NotFoundSchedule);
                return;
            }
            scheduledDate = schedule.date;
            scheduledMessage = (await scheduleNotifyRepo.findByScheduleId(schedule.id))[0].message;
        }

        var botMessage = "";
        botMessage += "Agendamento encontrado:\n\n";
        botMessage += "Mensagem: " + scheduledMessage + "\n";
        botMessage += "Agendado para: " + showDate(scheduledDate) + "\n";

        await this.saveMessage(botNumber, userNumber, botMessage, sessionId);
        await delay(1);
        await this.saveMessage(botNumber, userNumber, ContinueEditing, sessionId);

        sendMessage(userNumber, botMessage + "\n" + ContinueEditing);
        return;

    }
}
