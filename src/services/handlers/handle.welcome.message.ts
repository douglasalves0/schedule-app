import { MessageDto } from "src/dtos/message.dto";
import { Message } from "../interfaces/message.interface";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { SessionRepository } from "src/repositories/session.repository";
import { CreateNotificationMessage, NeedScheduleCode, WantedScheduleCode } from '../strategies/strategies.constants';
import { OnlyNumbersAllowed } from "src/utils/constants";
import { v4 as uuidv4} from "uuid";
import { ScheduleRepository } from "src/repositories/schedule.repository";
import { ScheduleNotifyRepository } from "src/repositories/schedule.notify.repository";
import { showDate } from "src/utils/functions";
import { sendMessage } from "src/api/moorse/send.message.api";
import { Saver } from "./save.session.message.method";
import { GoogleCalendarDataRepository } from "src/repositories/google.calendar.data.repository";
import { getAuth, configureCalendar } from "src/utils/functions";

export class HandleWelcomeMessage extends Saver implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4){

        const sessionRepo = new SessionRepository;
        const sessionMessageRepo = new SessionMessageRepository;
        const scheduleRepo = new ScheduleRepository;
        const scheduleNotifyRepo = new ScheduleNotifyRepository;
        const googleCalendarDataRepo = new GoogleCalendarDataRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        const userOption = Number(userMessage);

        switch(userOption){
            case 1:
                var botMessage = "Mensagens agendadas:\n\n";
                if(await googleCalendarDataRepo.isSynchronized(userNumber)){
                    const refreshToken = (await googleCalendarDataRepo.findByUserNumber(userNumber))[0].refresh_token;
                    const auth = await getAuth(refreshToken);
                    const calendar = await configureCalendar(auth);
                    const answer = await calendar.events.list({
                        calendarId: 'primary',
                        timeMin: (new Date()).toISOString()
                    });
                    for(var i=0;i<answer.data.items.length;i++){
                    	if(!answer.data.items[i].start){
                    	    continue;
                    	}
                    	const inicio = showDate(new Date(answer.data.items[i].start.dateTime));
                    	const notificacao = answer.data.items[i].summary;
                    	const code = answer.data.items[i].id;
                    	botMessage += `Notificação: ${notificacao}\nData: ${inicio}\nCódigo: ${code}\n\n`;
                    }
                }else{
                    const notifySchedules = await scheduleNotifyRepo.findByUserNumber(userNumber);
                    for(var i=0;i<notifySchedules.length;i++){
                        const scheduleId = notifySchedules[i].schedule_id;
                        const schedule = await scheduleRepo.findById(scheduleId);
                        if(schedule.status != "pending"){
                            continue;
                        }
                        botMessage += "Código: " + schedule.code + "\n";
                        botMessage += "Mensagem: " + notifySchedules[i].message + "\n";
                        botMessage += "Agendada para: " + showDate(schedule.date) + "\n\n";
                    }
                }
                await this.saveMessage(botNumber, userNumber, botMessage, sessionId);
                sendMessage(userNumber, botMessage);
                break;
            case 2:        
                await this.saveMessage(botNumber, userNumber, CreateNotificationMessage, sessionId);
                sendMessage(userNumber, CreateNotificationMessage);
                break;
            case 3:
                await this.saveMessage(botNumber, userNumber, NeedScheduleCode, sessionId);
                sendMessage(userNumber, NeedScheduleCode);
                break;
            case 4:
                await this.saveMessage(botNumber, userNumber, WantedScheduleCode, sessionId);
                sendMessage(userNumber, WantedScheduleCode);
                break;
            default:
                await this.saveMessage(botNumber, userNumber, OnlyNumbersAllowed, sessionId);
                sendMessage(userNumber, OnlyNumbersAllowed);
                break;
            }

    }
}
