import { GoogleRedirectDto } from "src/dtos/google.redirect.dto";
import { GoogleCalendarDataRepository } from "src/repositories/google.calendar.data.repository";
import { oauth2Client } from "src/api/google/google.oauth";
import { google } from "googleapis";
import { ScheduleNotifyRepository } from "src/repositories/schedule.notify.repository";
import { ScheduleRepository } from "src/repositories/schedule.repository";
import { showDate } from "src/utils/functions";

export class HandleRefreshToken{
    public async handle(state: string, code: string): Promise<string>{
        
        const tokens = (await oauth2Client.getToken(code)).tokens;
        const googleCalendarDataRepo = new GoogleCalendarDataRepository();
        
        googleCalendarDataRepo.save({
            created: new Date(),
            refresh_token: tokens.refresh_token,
            updated: new Date(),
            whatsapp_number: state
        });
        
        var oauth2 = oauth2Client;
        
        oauth2.setCredentials({
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expiry_date: tokens.expiry_date,
        });
        
        const calendar = google.calendar({
            version: "v3",
            auth: oauth2
        });
        
        const scheduleNotifyRepo = new ScheduleNotifyRepository();
        const scheduleRepo = new ScheduleRepository();
        const notifySchedules = await scheduleNotifyRepo.findByUserNumber(state);
        
	var exit = "";

        for(var i=0;i<notifySchedules.length;i++){

            const scheduleId = notifySchedules[i].schedule_id;
            const schedule = await scheduleRepo.findById(scheduleId);

            if(schedule[0].status != "pending"){
                continue;
            }

            await calendar.events.insert({
                auth: oauth2,
                calendarId: "primary",
                requestBody: {
                    "summary": notifySchedules[i].message,
                    "description": notifySchedules[i].message,
                    "start":{
                        'dateTime': schedule[0].date.toISOString(),
                        'timeZone': "America/Fortaleza",
                    },
                    "end":{
                        'dateTime': schedule[0].date.toISOString(),
                        'timeZone': "America/Fortaleza",
                    }
                }
            });
            
	    exit += `Notificação: ${notifySchedules[i].message}\nData: ${showDate(schedule[0].date)}\n\n`;
            
        }

	return exit;

    }
}
