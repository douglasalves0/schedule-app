export class SessionMessageDto{
    id: number;
    sessionId: number;
    src: string;
    from: string;
    message: string;
    direction: string;
    date: Date;
}