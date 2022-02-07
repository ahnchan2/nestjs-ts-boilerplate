import { Module } from '@nestjs/common';
import { OracleConfigService } from './config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [OracleConfigModule],
      useClass: OracleConfigService,
      inject: [OracleConfigService],
      connectionFactory: async(options) => {
        const connection = await createConnection(options);
        return connection;
      }
    }),
  ],
  providers: [OracleConfigService],
})
export class OracleConfigModule {}