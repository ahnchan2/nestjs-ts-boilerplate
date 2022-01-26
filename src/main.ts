import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MyLogger } from './common/utils/logger/logger.service';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.enableShutdownHooks();
  app.useLogger(app.get(MyLogger));

  const configService = app.get(ConfigService);
  const logger = app.get(MyLogger);
  const config = new DocumentBuilder()
    .setTitle('nestjs-tst-boilerplate')
    .setDescription('The nestjs-tst-boilerplate API description')
    .setVersion('0.0.1')
    .addTag('tag')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get<number>('app.port'));
  logger.log(`Application running on [${configService.get<string>('app.env')}] enviroment. ${await app.getUrl()}`);
}
bootstrap();
