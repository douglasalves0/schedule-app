import { NestFactory } from '@nestjs/core';
import { scheduleJob } from 'node-schedule';
import { AppModule } from './app.module';
import { handleJob } from './services/handle.job';
import { Message } from './services/interfaces/message.interface';
import { loadStrategies } from './services/strategies/strategies';

const MainJob = scheduleJob('0 0-59 * * * *', handleJob);

async function bootstrap(){
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

loadStrategies();

bootstrap();
