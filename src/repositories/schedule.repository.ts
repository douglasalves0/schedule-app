import { Schedule } from "src/models/schedule.entity";
import { ScheduleDto } from "src/dtos/schedule.dto";
import { createQueryBuilder } from "typeorm";
import { v4 as uuidv4} from 'uuid';

export class ScheduleRepository{

    public async save(schedule: ScheduleDto): Promise<uuidv4>{
        const answer = await createQueryBuilder().
        insert().
        into(Schedule).
        values([schedule]).
        execute();
        return answer.raw[0].id;
    }

    public async findAll(): Promise<Schedule[]>{
        const answer = await createQueryBuilder().
        select("*").
        from(Schedule, "schedule").
        execute();
        return answer;
    }

    public async findById(scheduleId: uuidv4): Promise<Schedule>{
        const answer = await createQueryBuilder().
        select("*").
        from(Schedule, "schedule").
        where("schedule.id = :id",{id:scheduleId}).
        execute();
        return answer;
    }

    public async findPendingSchedulesBySessionId(sessionId: uuidv4): Promise<Schedule[]>{
        const answer = await createQueryBuilder().
        select("*").
        from(Schedule, "schedule").
        where("schedule.session_id = :sessionId",{sessionId:sessionId}).
        andWhere("schedule.status = :status",{status: "pending"}).
        execute();
        return answer;
    }

}