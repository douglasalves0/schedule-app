import { Controller, Post, Body } from "@nestjs/common";
import { MessageDto } from "src/dtos/message.dto";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { SessionRepository } from "src/repositories/session.repository";
import { HandleMessage } from "src/services/handle.message";
import { v4 as uuidv4} from 'uuid';

@Controller('/webhooks')
export class WebhookController{
    @Post()
    public async receiveMessage(@Body() body: MessageDto): Promise <void>{
        const repo1 = new SessionRepository;
        const repo = new SessionMessageRepository;
        console.log("oi");
        var id = await repo1.findById('b2458af5-3db9-49bf-8757-7bcd7c680ac7');
        console.log("oi2");
        /*const sessionId = id.id;
        repo.save({
            date: new Date(),
            direction: 'out',
            from: "mari",
            message: "OPA",
            session_id: sessionId,
            to: "eu"
        });
        /*const handler = new HandleMessage;
        handler.handle(body);*/
    }
}