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

        console.log(this.checkDate(givenDate));

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
        var twoDots:number[] = [];
        var bars:number[] = [];
        console.log("oi");
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
        for(var i=0;i<=twoDots[0]-1;i++){
            strNumber1 += date[i];
            if(date[i]==' '){
                return false;
            }
        }
        var strNumber2: string;
        for(var i=twoDots[0]+1;i<=twoDots[1]-1;i++){
            strNumber2 += date[i];
            if(date[i]==' '){
                return false;
            }
        }
        var strNumber3: string;
        var p = bars[0]-1;
        for(var i=twoDots[1]+1;i<=bars[0]-1;i++){
            if(date[i]==' '){
                p = i;
                break;
            }
            strNumber3 += date[i];
        }
        var strNumber4: string;
        for(var i=p+1;i<=bars[0]-1;i++){
            strNumber4 += date[i];
            if(date[i]==' '){
                return false;
            }
        }
        var strNumber5: string;
        for(var i=bars[0]+1;i<=date.length-1;i++){
            strNumber5 += date[i];
            if(date[i]==' '){
                return false;
            }
        }
        console.log(strNumber1 + "/" + strNumber2 + "/" + strNumber3 + " " + strNumber4 + ":" + strNumber5);
        return true;
    }
}