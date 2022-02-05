export class SessionMessageDto{
    session_id: number;
    to: string;
    from: string;
    message: string;
    direction: string;
    date: Date;
}