import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import AppConfig from './config/app/config';
import { LoggerModule } from './common/utils/logger/logger.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import MySqlConfig from './config/database/mysql/config';
import { MySqlConfigModule } from './config/database/mysql/config.module';
import OracleConfig from './config/database/oracle/config';
import { OracleConfigModule } from './config/database/oracle/config.module';
import { UsersModule } from './models/modules/users.module';


@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, MySqlConfig, OracleConfig],
      envFilePath: `${process.env.NODE_ENV}` == '' ? '.env.dev' : `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('dev', 'stg', 'prd'),
      }),
    }),
    OracleConfigModule,
    MySqlConfigModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
