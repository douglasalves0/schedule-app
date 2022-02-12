import { ScheduleNotify } from "src/models/schedule.notify.entity";
import { ScheduleNotifyDto } from "src/dtos/schedule.notify.dto";
import { createQueryBuilder } from "typeorm";
import { v4 as uuidv4} from 'uuid';

export class ScheduleNotifyRepository{

    public async save(scheduleNotify: ScheduleNotifyDto): Promise<uuidv4>{
        const answer = await createQueryBuilder().
        insert().
        into(ScheduleNotify).
        values([scheduleNotify]).
        execute();
        return answer.raw[0].id;
    }

    public async findAll(): Promise<ScheduleNotify[]>{
        const answer = await createQueryBuilder().
        select("*").
        from(ScheduleNotify, "schedule_notify").
        execute();
        return answer;
    }

    public async findById(scheduleNotifyId: uuidv4): Promise<ScheduleNotify>{
        const answer = await createQueryBuilder().
        select("*").
        from(ScheduleNotify, "schedule_notify").
        where("schedule_notify.id = :id",{id:scheduleNotifyId}).
        execute();
        return answer;
    }

    public async findByScheduleId(scheduleId: uuidv4): Promise<ScheduleNotify[]>{
        const answer = await createQueryBuilder().
        select("*").
        from(ScheduleNotify, "schedule_notify").
        where("schedule_notify.schedule_id = :scheduleId",{scheduleId:scheduleId}).
        execute();
        return answer;
    }

}