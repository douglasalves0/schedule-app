export class MessageDto{
    id: string;
    channel: string;
    type: string;
    status: string;
    to: string;
    from: string;
    answeredDate: Date;
    content: string;
    contactUser: {
        number: string;
        name: string;
        profileImageUrl: string;
    };
    contactBusiness:{
        number: string;
        name: string;
        profileImageUrl: string;
    }
    integrationId: string
}