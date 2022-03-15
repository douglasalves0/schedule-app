import { MessageDto } from 'src/dtos/message.dto';
import { Message } from 'src/services/interfaces/message.interface';
import { v4 as uuidv4 } from 'uuid';
import { SessionMessageRepository } from 'src/repositories/session.message.repository';
import { CreateNotificationMessage } from '../strategies/strategies.constants';
import { OnlyNumbersAllowed, SucessSchedule } from 'src/utils/constants';
import { ScheduleRepository } from 'src/repositories/schedule.repository';
import { ScheduleNotifyRepository } from 'src/repositories/schedule.notify.repository';
import { GoogleCalendarDataRepository } from 'src/repositories/google.calendar.data.repository';
import { getCode, checkDate } from 'src/utils/functions';
import { sendMessage } from "src/api/moorse/send.message.api";
import { Saver } from './save.session.message.method';
import { configureCalendar, getAuth } from 'src/utils/functions';

export class HandleConfirmNotification extends Saver implements Message{
    public async handle(message: MessageDto, sessionId: uuidv4) {
        
        const sessionMessageRepo = new SessionMessageRepository;
        const scheduleRepo = new ScheduleRepository;
        const scheduleNotifyRepo = new ScheduleNotifyRepository;
        const googleCalendarDataRepo = new GoogleCalendarDataRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const userMessage = message.content;

        const userDateMessage = (await sessionMessageRepo.findKthLatestMessageFromUser(userNumber, 2))[0].message;
        const userNotifyMessage = (await sessionMessageRepo.findKthLatestMessageFromUser(userNumber, 1))[0].message;

        if(userMessage == "2"){
            await this.saveMessage(botNumber, userNumber, CreateNotificationMessage, sessionId);
            sendMessage(userNumber, CreateNotificationMessage);
            return ;
        }
        if(userMessage == "1"){
            await this.saveMessage(botNumber, userNumber, SucessSchedule, sessionId);
            if(await googleCalendarDataRepo.isSynchronized(userNumber)){
                const found = await googleCalendarDataRepo.findByUserNumber(userNumber);
                const refreshToken = found[0].refresh_token;
                const oauth2 = await getAuth(refreshToken);
                const calendar = await configureCalendar(oauth2);
                calendar.events.insert({
                    auth: oauth2,
                    calendarId: "primary",
                    requestBody: {
                        "summary": userNotifyMessage,
                        "description": userNotifyMessage,
                        "start":{
                            'dateTime': (new Date(checkDate(userDateMessage))).toISOString(),
                            'timeZone': "America/Fortaleza",
                        },
                        "end":{
                            'dateTime': (new Date(checkDate(userDateMessage))).toISOString(),
                            'timeZone': "America/Fortaleza",
                        }
                    }
                });
            }else{
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
            }
            sendMessage(userNumber, SucessSchedule);
            return ;
        }
        await this.saveMessage(botNumber, userNumber, OnlyNumbersAllowed, sessionId);
        sendMessage(userNumber, OnlyNumbersAllowed);

    }

}