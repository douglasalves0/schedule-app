import { v4 as uuidv4 } from 'uuid';

export function checkDate(date: string): string{
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
            return undefined;
        }
    }
    if(twoDots.length != 1 || bars.length != 2){
        return undefined;
    }
    if(twoDots[0] < bars[1]){
        return undefined;
    }
    var strNumber1 = "";
    for(var i=0;i<=bars[0]-1;i++){
        strNumber1 += date[i];
        if(date[i]==' '){
            return undefined;
        }
    }
    var strNumber2 = "";
    for(var i=bars[0]+1;i<=bars[1]-1;i++){
        strNumber2 += date[i];
        if(date[i]==' '){
            return undefined;
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
            return undefined;
        }
    }
    var strNumber5 = "";
    for(var i=twoDots[0]+1;i<=date.length-1;i++){
        strNumber5 += date[i];
        if(date[i]==' '){
            return undefined;
        }
    }
    const MonthDayYearDate=strNumber2+"/"+strNumber1+"/"+strNumber3+" "+strNumber4+":"+strNumber5;
    if(isNaN(Date.parse(MonthDayYearDate))){
        console.log("aqui");
        return undefined;
    }
    return MonthDayYearDate;
}

export function getCode(): string{
    var uuid = uuidv4();
    var answer = "";
    for(var i=0;i<8;i++){
        answer += uuid[i];
    }
    return answer;
}

export function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}