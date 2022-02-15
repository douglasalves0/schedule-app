import { Controller, Post, Body } from "@nestjs/common";
import { MessageDto } from "src/dtos/message.dto";
import { HandleMessage } from "src/services/handle.message";

@Controller('/webhooks')
export class WebhookController{
    @Post()
    public async receiveMessage(@Body() body: MessageDto): Promise <void>{
        const handler = new HandleMessage;
        handler.handle(body);
    }
}