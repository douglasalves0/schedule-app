import { schedule } from "src/models/schedule.entity";
import { ScheduleDto } from "src/dtos/schedule.dto";
import { createQueryBuilder } from "typeorm";
import { v4 as uuidv4} from 'uuid';
import { SessionRepository } from "./session.repository";
import { showDate } from "src/utils/functions";

export class ScheduleRepository{

    public async save(schedules: ScheduleDto): Promise<uuidv4>{
        const answer = await createQueryBuilder().
        insert().
        into(schedule).
        values([schedules]).
        execute();
        console.log(answer);
        return answer.raw[0].id;
    }

    public async findAll(): Promise<schedule[]>{
        const answer = await createQueryBuilder().
        select("*").
        from(schedule, "schedule").
        execute();
        return answer;
    }

    public async findById(scheduleId: uuidv4){
        const answer = await createQueryBuilder().
        select("*").
        from(schedule, "schedule").
        where("schedule.id = :id",{id:scheduleId}).
        execute();
        return answer;
    }

    public async findPendingSchedulesBySessionId(sessionId: uuidv4): Promise<schedule[]>{
        const answer = await createQueryBuilder().
        select("*").
        from(schedule, "schedule").
        where("schedule.session_id = :sessionId",{sessionId:sessionId}).
        andWhere("schedule.status = :status",{status: "pending"}).
        execute();
        return answer;
    }

    public async findPendingSchedulesByCodeByUserNumber(userNumber: string, code: string): Promise<schedule>{
        const answer = await createQueryBuilder().
        select("*").
        from(schedule, "schedule").
        where("schedule.code = :code",{code:code}).
        andWhere("schedule.status = :status",{status: "pending"}).
        execute();
        const sessionRepo = new SessionRepository;
        for(var i=0;i<answer.length;i++){
            const sessionId = answer[i].session_id;
            const session = await sessionRepo.findById(sessionId);
            const whatsappNumber = session[0].wa_user;
            if(whatsappNumber == userNumber){
                return answer[i];
            }
        }
        return undefined;
    }

    public async changeDateById(scheduleId: uuidv4, date: Date): Promise<void>{
        await createQueryBuilder().
        update(schedule).
        set({date: date}).
        where("id = :id", {id: scheduleId}).
        execute();
    }

    public async findSchedulesEarlierThanNow(): Promise<schedule[]>{
        const answer = await createQueryBuilder().
        select("*").
        from(schedule, "schedule").
        where("date <= :date",{date:new Date()}).
        andWhere("status = :status",{status:"pending"}).
        execute();
        return answer;
    }

    public async markAsExecutedSchedulesEarlierThanNow():Promise<void>{
        await createQueryBuilder().
        update(schedule).
        set({status: "executed"}).
        where("date <= :date", {date: new Date()}).
        andWhere("status = :status",{status:"pending"}).
        execute();
    }

}