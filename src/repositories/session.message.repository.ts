import { SessionMessageDto } from "src/dtos/session.message.dto";
import { SessionMessage } from "src/models/session.message.entity";
import { getRepository } from "typeorm";

export class SessionMessageRepository{

    sessionMessage = getRepository(SessionMessage);

    public async save(sessionMessage: SessionMessageDto)/*: Promise<SessionMessageModel>*/{
        const answer = await this.sessionMessage.save(sessionMessage);
        return answer;
    }

    public async findAll(): Promise<SessionMessage[]>{
        const answer = await this.sessionMessage.find();
        return answer;
    }

    public async findById(sessionMessageId: number): Promise<SessionMessage>{
        const answer = await this.sessionMessage.findOne(sessionMessageId);
        return answer;
    }

    public async findLatestBotMessage(userNumber: string): Promise<SessionMessage>{
        console.log("aqui");
        const found = await this.sessionMessage.find({ where: {direction: 'out', to: userNumber}});
        console.log("aqui também")
        if(found.length == 0){
            var sessionMessage = new SessionMessage;
            sessionMessage.date = new Date('01/01/1999 00:00:00 AM');
            return sessionMessage;
        }
        var answer = found[0];
        for(var i=0;i<found.length;i++){
            if(found[i].date > answer.date){
                answer = found[i];
            }
        }
        return answer;
    }

}