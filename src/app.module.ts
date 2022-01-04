import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import AppConfig from './config/app/config';
import { LoggerModule } from './common/utils/logger/logger.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import MySqlConfig from './config/database/mysql/config';
import { MySqlConfigModule } from './config/database/mysql/config.module';
import { MySqlConfigService } from './config/database/mysql/config.service';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, MySqlConfig],
      envFilePath: `${process.env.NODE_ENV}` == '' ? '.env.dev' : `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('dev', 'stg', 'prd'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [MySqlConfigModule],
      useClass: MySqlConfigService,
      inject: [MySqlConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
