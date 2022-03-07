import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookController } from './controllers/webhook.controller';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { databaseName, databasePass, databasePort, databaseUser } from './config/configs';

@Module({
  imports: [TypeOrmModule.forRoot({
    "namingStrategy": new SnakeNamingStrategy(),
    "type": "postgres",
    "host": "localhost",
    "port": databasePort,
    "username": databaseUser,
    "password": databasePass,
    "database": databaseName,
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