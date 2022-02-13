import { Schedule } from "src/models/schedule.entity";
import { ScheduleDto } from "src/dtos/schedule.dto";
import { createQueryBuilder } from "typeorm";
import { v4 as uuidv4} from 'uuid';
import { SessionRepository } from "./session.repository";

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

    public async findPendingSchedulesByCodeByUserNumber(userNumber: string, code: string): Promise<Schedule>{
        const answer = await createQueryBuilder().
        select("*").
        from(Schedule, "schedule").
        where("schedule.code = :code",{code:code}).
        andWhere("schedule.status = :status",{status: "pending"}).
        execute();
        console.log(answer);
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

}