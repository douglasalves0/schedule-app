import { Controller, Post, Body } from "@nestjs/common";
import { MessageDto } from "src/dtos/message.dto";
import { SessionMessageRepository } from "src/repositories/session.message.repository";
import { SessionRepository } from "src/repositories/session.repository";
import { HandleMessage } from "src/services/handle.message";

@Controller('/webhooks')
export class WebhookController{
    @Post()
    public async receiveMessage(@Body() body: MessageDto): Promise <void>{
        const handler = new HandleMessage;
        handler.handle(body);
    }
}