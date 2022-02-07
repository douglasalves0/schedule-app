import { MessageDto } from 'src/dtos/message.dto';
import { Message } from 'src/services/interfaces/message.interface';
import { v4 as uuidv4 } from 'uuid';
import { SessionRepository } from 'src/repositories/session.repository';
import { SessionMessageRepository } from 'src/repositories/session.message.repository';
import { ValidDateNeeded } from 'src/utils/constants';

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

        if(!this.checkDate(givenDate)){
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

        var now = new Date();
        var userDate = new Date(givenDate);

        if(now >= userDate){
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

        //mecher no schedule

    }
    public checkDate(date: string): boolean{
        var twoDots:number[] = [];
        var bars:number[] = [];
        for(var i=0;i<date.length;i++){
            if(date[i] == '/'){
                bars.push(i);
                continue;
            }
            if(date[i] == ':'){
                twoDots.push(i);
                continue;
            }
            if(!(date[i] >= '0' && date[i] <= '9') && date[i] != ' '){
                return false;
            }
        }
        if(twoDots.length != 1 || bars.length != 2){
            return false;
        }
        if(twoDots[0] < bars[1]){
            return false;
        }
        var strNumber1 = "";
        for(var i=0;i<=bars[0]-1;i++){
            strNumber1 += date[i];
            if(date[i]==' '){
                return false;
            }
        }
        var strNumber2 = "";
        for(var i=bars[0]+1;i<=bars[1]-1;i++){
            strNumber2 += date[i];
            if(date[i]==' '){
                return false;
            }
        }
        var strNumber3 = "";
        var p = bars[0]-1;
        for(var i=bars[1]+1;i<=twoDots[0]-1;i++){
            if(date[i]==' '){
                p = i;
                break;
            }
            strNumber3 += date[i];
        }
        var strNumber4 = "";
        for(var i=p+1;i<=twoDots[0]-1;i++){
            strNumber4 += date[i];
            if(date[i]==' '){
                return false;
            }
        }
        var strNumber5 = "";
        for(var i=twoDots[0]+1;i<=date.length-1;i++){
            strNumber5 += date[i];
            if(date[i]==' '){
                return false;
            }
        }
        if(isNaN(Date.parse(date))){
            return false;
        }
        return true;
    }
}