import { SessionDto } from "src/dtos/session.dto";
import { session } from "src/models/session.entity";
import { showDate } from "src/utils/functions";
import { createQueryBuilder } from "typeorm";
import { v4 as uuidv4} from 'uuid';

export class SessionRepository{

    public async save(sessions: SessionDto): Promise<uuidv4>{
        const answer = await createQueryBuilder().
        insert().
        into(session).
        values([sessions]).
        execute();
        return answer.raw[0].id;
    }

    public async findAll(): Promise<session[]>{
        const answer = await createQueryBuilder().
        select("*").
        from(session, "session").
        execute();
        return answer;
    }

    public async findById(session_id: uuidv4): Promise<session>{
        const answer = await createQueryBuilder().
        select("*").
        from(session, "session").
        where("session.id = :id",{id:session_id}).
        execute();
        return answer;
    }

    public async updateDateById(session_id: uuidv4): Promise<void>{
        await createQueryBuilder()
        .update(session)
        .set({latest_message: new Date()})
        .where("id = :id", {id: session_id})
        .execute();
    }

    public async closeOldSessions(): Promise<void>{
        var lastOneHour = new Date();
        lastOneHour.setTime(lastOneHour.getTime() - (1000 * 60 * 60));
        await createQueryBuilder()
        .update(session)
        .set({status: "closed"})
        .where("latest_message < :date", {date: lastOneHour})
        .execute();
    }

}