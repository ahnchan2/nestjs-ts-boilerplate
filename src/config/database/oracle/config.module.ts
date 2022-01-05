import { Module } from '@nestjs/common';
import { OracleConfigService } from './config.service';
import { getConnectionToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  providers: [OracleConfigService],
  // providers: [
  //   {
  //     provide: OracleConfigService,
  //     useClass: OracleConfigService,
  //     inject: [getConnectionToken('oracleConnection')],
  //   },
  // ]
})
export class OracleConfigModule {}