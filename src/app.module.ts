import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookController } from './controllers/webhook.controller';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [TypeOrmModule.forRoot({
    "namingStrategy": new SnakeNamingStrategy(),
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "123",
    "database": "scheduledatabase",
    "entities": ["dist/**/*.entity.js"],
    "synchronize": false,
    "migrations": ["dist/migrations/*{.ts,.js}"],
    "migrationsTableName": "migrations",
    "migrationsRun": true
  })],
  controllers: [WebhookController],
  providers: [],
})
export class AppModule {}