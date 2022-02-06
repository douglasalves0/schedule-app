import {v4 as uuidv4} from 'uuid';

export class SessionMessageDto{
    session_id: uuidv4;
    to: string;
    from: string;
    message: string;
    direction: string;
    date: Date;
}