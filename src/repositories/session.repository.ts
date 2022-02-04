import { SessionDto } from "src/dtos/session.dto";
import { Session } from "src/models/session.entity";
import { getRepository } from "typeorm";

export class SessionRepository{

    session = getRepository(Session);

    public async save(session: SessionDto): Promise<Session>{
        const answer = await this.session.save(session);
        return answer;
    }

    public async findAll(): Promise<Session[]>{
        const answer = await this.session.find();
        return answer;
    }

    public async findById(sessionId: number): Promise<Session>{
        const answer = await this.session.findOne(sessionId);
        return answer;
    }

}