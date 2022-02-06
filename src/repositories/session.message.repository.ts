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

    public async findAll(): Promise<SessionMessageDto[]>{
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

    public async findLatestBotMessage(userNumber: string): Promise<SessionMessageDto>{
        const found = await createQueryBuilder().
        select("*").
        from(SessionMessage, "session_message").
        where("session_message.direction = :direction",{direction: "out"}).
        andWhere("session_message.to = :to",{to: userNumber}).
        execute();
        if(found.length == 0){
            return {
                session_id: "",
                from: "",
                to: "",
                message: "",
                direction: "",
                date: new Date('01/01/1999 00:00:00 AM')
            };
        }
        console.log(answer);
        var answer = found[0];
        for(var i=0;i<found.length;i++){
            if(found[i].date > answer.date){
                answer = found[i];
            }
        }
        return answer;
    }

}