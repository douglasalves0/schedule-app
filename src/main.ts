import { NestFactory } from '@nestjs/core';
import { scheduleJob } from 'node-schedule';
import { AppModule } from './app.module';
import { handleJob } from './services/handle.job';
import { loadStrategies } from './services/strategies/strategies';
import { applicationPort } from './config/configs';

const MainJob = scheduleJob('0 0-59 * * * *', handleJob);

async function bootstrap(){
  const app = await NestFactory.create(AppModule);
  await app.listen(applicationPort);
}

loadStrategies();

bootstrap();
