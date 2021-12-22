import { NestFactory } from '@nestjs/core';
import { MyLogger } from './common/utils/logger/logger.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(MyLogger));
  await app.listen(3000);
}
bootstrap();
