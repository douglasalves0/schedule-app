import { schedule_notify } from "src/models/schedule.notify.entity";
import { ScheduleNotifyDto } from "src/dtos/schedule.notify.dto";
import { createQueryBuilder } from "typeorm";
import { v4 as uuidv4} from 'uuid';

export class ScheduleNotifyRepository{

    public async save(scheduleNotify: ScheduleNotifyDto): Promise<uuidv4>{
        const answer = await createQueryBuilder().
        insert().
        into(schedule_notify).
        values([scheduleNotify]).
        execute();
        return answer.raw[0].id;
    }

    public async findAll(): Promise<schedule_notify[]>{
        const answer = await createQueryBuilder().
        select("*").
        from(schedule_notify, "schedule_notify").
        execute();
        return answer;
    }

    public async findById(scheduleNotifyId: uuidv4): Promise<schedule_notify>{
        const answer = await createQueryBuilder().
        select("*").
        from(schedule_notify, "schedule_notify").
        where("schedule_notify.id = :id",{id:scheduleNotifyId}).
        execute();
        return answer;
    }

    public async findByUserNumber(userNumber: string): Promise<schedule_notify[]>{
        const answer = await createQueryBuilder().
        select("*").
        from(schedule_notify, "schedule_notify").
        where("schedule_notify.notify_number = :notify_number",{notify_number:userNumber}).
        execute();
        return answer;
    }

    public async findByScheduleId(scheduleId: uuidv4): Promise<schedule_notify[]>{
        const answer = await createQueryBuilder().
        select("*").
        from(schedule_notify, "schedule_notify").
        where("schedule_notify.schedule_id = :scheduleId",{scheduleId:scheduleId}).
        execute();
        return answer;
    }

    public async changeMessageByScheduleId(scheduleId: uuidv4, message: string): Promise<void>{
        await createQueryBuilder().
        update(schedule_notify).
        set({message: message}).
        where("schedule_id = :schedule_id", {schedule_id: scheduleId}).
        execute();
    }

}