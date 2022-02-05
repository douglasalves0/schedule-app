import { SessionDto } from "src/dtos/session.dto";
import { Session } from "src/models/session.entity";
import { getRepository, createConnection, createQueryBuilder } from "typeorm";

export class SessionRepository{

    session = getRepository(Session);

    public async save(session: SessionDto){
        const answer = await createQueryBuilder().
        insert().
        into(Session).
        values([session]).execute();
        console.log(answer);
    }

    public async findAll(): Promise<Session[]>{
        const answer = await this.session.find();
        return answer;
    }

    public async findById(session_id: number): Promise<Session>{
        const answer = await this.session.findOne(session_id);
        return answer;
    }

}