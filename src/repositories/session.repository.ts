import { SessionDto } from "src/dtos/session.dto";
import { Session } from "src/models/session.entity";
import { createQueryBuilder } from "typeorm";
import { v4 as uuidv4} from 'uuid';

export class SessionRepository{

    public async save(session: SessionDto): Promise<uuidv4>{
        const answer = await createQueryBuilder().
        insert().
        into(Session).
        values([session]).
        execute();
        return answer.raw[0].id;
    }

    public async findAll(): Promise<SessionDto[]>{
        const answer = await createQueryBuilder().
        select("*").
        from(Session, "session").
        execute();
        return answer;
    }

    public async findById(session_id: uuidv4): Promise<SessionDto>{
        const answer = await createQueryBuilder().
        select("*").
        from(Session, "session").
        where("session.id = :id",{id:session_id}).
        execute();
        return answer;
    }

    public async updateDateById(session_id: uuidv4): Promise<void>{
        await createQueryBuilder()
        .update(Session)
        .set({latest_message: new Date()})
        .where("id = :id", {id: session_id})
        .execute();
    }

}