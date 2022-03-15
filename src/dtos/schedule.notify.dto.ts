import {v4 as uuidv4} from "uuid";

export class ScheduleNotifyDto{
    schedule_id: uuidv4;
    notify_number: string;
    message: string;
}