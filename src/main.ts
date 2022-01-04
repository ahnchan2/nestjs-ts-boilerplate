import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MyLogger } from './common/utils/logger/logger.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(MyLogger));

  const configService = app.get(ConfigService);
  const logger = app.get(MyLogger);

  await app.listen(configService.get<number>('app.port'));
  logger.log(`Application running on [${configService.get<string>('app.env')}] enviroment. ${await app.getUrl()}`);
}
bootstrap();
