import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookController } from './controllers/webhook.controller';

@Module({
  imports: [TypeOrmModule.forRoot()],//lembrar de tirar o synchronize:true do ormconfig.json quando for subir pra prod
  controllers: [WebhookController],
  providers: [],
})
export class AppModule {}
