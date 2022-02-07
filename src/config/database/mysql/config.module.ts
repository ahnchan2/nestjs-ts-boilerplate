import { Module } from '@nestjs/common';
import { MySqlConfigService } from './config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [MySqlConfigModule],
      useClass: MySqlConfigService,
      inject: [MySqlConfigService],
      connectionFactory: async(options) => {
        const connection = await createConnection(options);
        return connection;
      }
    }),
  ],
  providers: [MySqlConfigService],
})
export class MySqlConfigModule {}