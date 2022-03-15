import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGoogleController } from './controllers/google.api.controller';
import { WebhookController } from './controllers/webhook.controller';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [WebhookController,AuthGoogleController],
  providers: [],
})
export class AppModule {}