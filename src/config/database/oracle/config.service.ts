import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import OracleConfig from './config';

@Injectable()
export class OracleConfigService implements TypeOrmOptionsFactory {

  constructor(
    @Inject(OracleConfig.KEY)
    private readonly oracleConfig: ConfigType<typeof OracleConfig>,
  ) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
        type: 'oracle',
        host: this.oracleConfig.host,
        port: this.oracleConfig.port,
        username: this.oracleConfig.username,
        password: this.oracleConfig.password,
        // database: this.mySqlConfig.database,
        sid: this.oracleConfig.sid,
        // entities: this.mySqlConfig.entities,
        // autoLoadEntities: true,
        };
    }

}