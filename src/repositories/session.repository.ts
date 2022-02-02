import { InjectRepository } from "@nestjs/typeorm";
import { SessionDto } from "src/dtos/session.dto";
import { SessionModel } from "src/models/session.entity";
import { Repository } from "typeorm";

export class SessionRepository{

    constructor (
        @InjectRepository(SessionModel) private session: Repository<SessionModel>
    ){}

    public async save(session: SessionDto): Promise<SessionModel>{
        const answer = await this.session.save(session);
        return answer;
    }

    public async findAll(): Promise<SessionModel[]>{
        const answer = await this.session.find();
        return answer;
    }

    public async findById(sessionId: number): Promise<SessionModel>{
        const answer = await this.session.findOne(sessionId);
        return answer;
    }

}