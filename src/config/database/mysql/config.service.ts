import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import MySqlConfig from './config';

@Injectable()
export class MySqlConfigService implements TypeOrmOptionsFactory {

  constructor(
    @Inject(MySqlConfig.KEY)
    private readonly mySqlConfig: ConfigType<typeof MySqlConfig>,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'mysql',
      type: 'mysql',
      username: this.mySqlConfig.username,
      password: this.mySqlConfig.password,
      port: this.mySqlConfig.port,
      host: this.mySqlConfig.host,
      database: this.mySqlConfig.database,
      logging: process.env.NODE_ENV !== 'prd' ? true : false,
      maxQueryExecutionTime: 30000,
      keepConnectionAlive: true,
    };
  }

}