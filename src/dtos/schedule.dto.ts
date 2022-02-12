import {v4 as uuidv4} from 'uuid';

export class ScheduleDto{
    session_id: uuidv4;
    type: string;
    date: Date;
    status: string;
    error: string;
    created: Date;
    updated: Date;
    code: string;
}