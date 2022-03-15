import { MessageDto } from "src/dtos/message.dto";
import { v4 as uuidv4 } from 'uuid';
import { 
    ChoiceNotificationMessage, 
    ConfirmNotificationMessage, 
    ContinueEditing, 
    CreateNotificationMessage, 
    NeedScheduleCode, 
    SyncAccount, 
    TypeNewDate, 
    TypeNewMessage, 
    WantedScheduleCode, 
    WelcomeMessage 
} from "./strategies.constants";

import { DefaultHandler } from "../handlers/handle.default";
import { HandleNeedScheduleCode } from "../handlers/handle.need.schedule.code";
import { HandleContinueEditing } from "../handlers/handle.continue.editing";
import { HandleTypeNewDate } from "../handlers/handle.type.new.date";
import { HandleTypeNewMessage } from "../handlers/handle.type.new.message";
import { HandleWantedScheduleCode } from "../handlers/handle.wanted.schedule.code";
import { HandleWelcomeMessage } from "../handlers/handle.welcome.message";
import { HandleChoiceNotification } from "../handlers/handle.choice.notification";
import { HandleConfirmNotification } from "../handlers/handle.confirm.notification";
import { HandleCreateNotification } from "../handlers/handle.create.notification";
import { HandleSyncAccount } from "../handlers/handle.sync.account";

export async function loadStrategies(){
    strategies.set(WelcomeMessage, new HandleWelcomeMessage());    
    strategies.set(CreateNotificationMessage, new HandleCreateNotification());
    strategies.set(ChoiceNotificationMessage, new HandleChoiceNotification());
    strategies.set(ConfirmNotificationMessage, new HandleConfirmNotification());
    strategies.set(NeedScheduleCode, new HandleNeedScheduleCode());
    strategies.set(ContinueEditing, new HandleContinueEditing());
    strategies.set(TypeNewDate, new HandleTypeNewDate());
    strategies.set(TypeNewMessage, new HandleTypeNewMessage());
    strategies.set(WantedScheduleCode, new HandleWantedScheduleCode());
    strategies.set(SyncAccount, new HandleSyncAccount);
}

export async function execStrategy(message: string, sessionId: uuidv4, messageDto: MessageDto){
    const usedStrategy = strategies.get(message);
    var handler = new DefaultHandler();
    if(usedStrategy != undefined){
        handler = usedStrategy;
    }
    handler.handle(messageDto, sessionId);
}

var strategies = new Map();