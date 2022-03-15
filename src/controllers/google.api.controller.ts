import { Controller, Post, Body, Query, Get } from "@nestjs/common";
import { HandleRefreshToken } from "src/services/handle.refresh.token";
import { sendMessage } from "src/api/moorse/send.message.api";

@Controller()
export class AuthGoogleController{
    @Get('/google/auth')
    public async receiveMessage(@Query('state') state: string, @Query('code') code: string): Promise <string>{
        console.log(state);
        const handler = new HandleRefreshToken;
        const notifications = await handler.handle(state, code);
        sendMessage(state, "Sua sincronização com o calendar foi concluída com sucesso!!" + (notifications?"\n\nNão se preocupe, já transferimos seus agendamentos para o google agenda!!\n\n"+notifications:""));
        return "Sincronização concluída com sucesso, retorne ao Whatsapp";
    }
}
