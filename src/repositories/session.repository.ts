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
        console.log(answer.raw[0].id);
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

}