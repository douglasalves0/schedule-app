import { GoogleCalendarDataDto } from "src/dtos/google.calendar.data.dto";
import { google_calendar_data } from "src/models/google.calendar.data.entity";
import { createQueryBuilder } from "typeorm";
import { v4 as uuidv4} from 'uuid';

export class GoogleCalendarDataRepository{

    public async save(data: GoogleCalendarDataDto): Promise<uuidv4>{
        const answer = await createQueryBuilder().
        insert().
        into(google_calendar_data).
        values([data]).
        execute();
        return answer.raw[0].id;
    }

    public async findByUserNumber(userNumber: string): Promise<google_calendar_data[]>{
        const answer = await createQueryBuilder().
        select("*").
        from(google_calendar_data, "google_calendar_data").
        where("google_calendar_data.whatsapp_number = :whatsapp_number",{whatsapp_number:userNumber}).
        execute();
        return answer;
    }

    public async isSynchronized(userNumber): Promise<boolean>{
        const found = await this.findByUserNumber(userNumber);
        if(found.length == 0){
            return false;            
        }
        return true;
    }

}