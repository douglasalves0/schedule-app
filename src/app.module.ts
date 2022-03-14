import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookController } from './controllers/webhook.controller';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [WebhookController],
  providers: [],
})
export class AppModule {}