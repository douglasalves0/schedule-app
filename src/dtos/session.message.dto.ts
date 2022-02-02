export class SessionMessageDto{
    sessionId: number;
    to: string;
    from: string;
    message: string;
    direction: string;
    date: Date;
}