import { InjectRepository } from "@nestjs/typeorm";
import { SessionMessageDto } from "src/dtos/session.message.dto";
import { SessionMessageModel } from "src/models/session.message.entity";
import { Repository } from "typeorm";

export class SessionMessageRepository{

    constructor (
        @InjectRepository(SessionMessageModel) private sessionMessage: Repository<SessionMessageModel>
    ){}

    public async save(sessionMessage: SessionMessageDto): Promise<SessionMessageModel>{
        const answer = await this.sessionMessage.save(sessionMessage);
        return answer;
    }

    public async findAll(): Promise<SessionMessageModel[]>{
        const answer = await this.sessionMessage.find();
        return answer;
    }

    public async findById(sessionMessageId: number): Promise<SessionMessageModel>{
        const answer = await this.sessionMessage.findOne(sessionMessageId);
        return answer;
    }

}