import { SessionDto } from "src/dtos/session.dto";
import { SessionMessageDto } from "src/dtos/session.message.dto";
import { SessionMessage } from "src/models/session.message.entity";
import { createQueryBuilder} from "typeorm";
import { v4 as uuidv4} from 'uuid';

export class SessionMessageRepository{

    public async save(sessionMessage: SessionMessageDto):Promise<uuidv4>{
        const answer = await createQueryBuilder().
        insert().
        into(SessionMessage).
        values([sessionMessage]).
        execute();
        return answer.raw[0].id;
    }

    public async findAll(): Promise<SessionMessage[]>{
        const answer = await createQueryBuilder().
        select("*").
        from(SessionMessage, "session_message").
        execute();
        return answer;
    }

    public async findById(sessionMessageId: number): Promise<SessionMessage>{
        const answer = await createQueryBuilder().
        select("*").
        from(SessionMessage, "session_message").
        where("session_message.id = :id",{id:sessionMessageId}).
        execute();
        return answer;
    }

    public async findKthLatestMessageToUser(userNumber: string, offset: number): Promise<SessionMessage[]>{
        const answer = await createQueryBuilder().
        select("*").
        from(SessionMessage, "session_message").
        orderBy("session_message.date", "DESC").
        where("session_message.direction = :direction",{direction: "out"}).
        andWhere("session_message.to = :to",{to: userNumber}).
        limit(1).
        offset(offset).
        execute();
        return answer;
    }

    public async findKthLatestMessageFromUser(userNumber: string, offset: number): Promise<SessionMessage[]>{
        const answer = await createQueryBuilder().
        select("*").
        from(SessionMessage, "session_message").
        orderBy("session_message.date", "DESC").
        where("session_message.direction = :direction",{direction: "in"}).
        andWhere("session_message.from = :from",{from: userNumber}).
        limit(1).
        offset(offset).
        execute();
        return answer;
    }

}