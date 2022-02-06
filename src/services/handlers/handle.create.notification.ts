import { MessageDto } from 'src/dtos/message.dto';
import { Message } from 'src/services/interfaces/message.interface';
import { v4 as uuidv4 } from 'uuid';
import { SessionRepository } from 'src/repositories/session.repository';
import { SessionMessageRepository } from 'src/repositories/session.message.repository';
import { ValidDateNeeded } from 'src/utils/constants';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';

export class CreateNotificationHandler implements Message{
    public handle(message: MessageDto, sessionId: uuidv4) {
        
        const sessionRepo = new SessionRepository;
        const sessionMessageRepo = new SessionMessageRepository;

        const userNumber = message.from;
        const botNumber = message.to;
        const givenDate = message.content;

        sessionMessageRepo.save({
            date: new Date(),
            direction: "in",
            from: userNumber,
            message: givenDate,
            session_id: sessionId,
            to: botNumber
        });

        var isValidDate  = !isNaN(Date.parse(givenDate));

        if(!isValidDate){
            sessionMessageRepo.save({
                date: new Date(),
                direction: "out",
                from: botNumber,
                message: ValidDateNeeded,
                session_id: sessionId,
                to: userNumber
            });
            console.log("Mensagem do bot:\n" + ValidDateNeeded);
            return;
        }

        console.log("A data é válida\n");

        //mecher no schedule

    }
    public checkDate(date: string): boolean{
        var twoDots:number[];
        var bars:number[];
        for(var i=0;i<date.length;i++){
            if(date[i] == '/'){
                bars.push(i);
            }
            if(date[i] == ':'){
                twoDots.push(i);
            }
            if(!(date[i].toLowerCase() != date[i].toUpperCase())){
                return false;
            }
        }
        if(twoDots.length != 1 || bars.length != 2){
            return false;
        }
        if(twoDots[0] > bars[1]){
            return false;
        }
        var strNumber1: string;
        var strNumber2: string;
        var strNumber3: string;
        var strNumber4: string;
        var strNumber5: string;
    }
}