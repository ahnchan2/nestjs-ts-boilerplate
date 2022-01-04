import { Injectable, Inject, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import AppConfig from './config/app/config';
import MySqlConfig from './config/database/mysql/config';
import { getConnection, getManager } from "typeorm";

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    // env test
    @Inject(AppConfig.KEY)
    private readonly appConfig: ConfigType<typeof AppConfig>,

    @Inject(MySqlConfig.KEY)
    private readonly mySqlConfig: ConfigType<typeof MySqlConfig>,
  ) {}

  getHello(): string {
    // logging test
    this.logger.log('log, this is a message in AppService');
    this.logger.error('error, this is a message in AppService');
    this.logger.debug('debug, this is a message in AppService');
    this.logger.warn('warn, this is a message in AppService');
    this.logger.verbose('verbose, this is a message in AppService');

    this.getUser();
    this.getUserWithTran();
    
    // env test
    return 'Hello World!, running in....' + this.appConfig.env;
  }

  async getUser(): Promise<boolean> {
    const queryRunner = await getConnection().createQueryRunner();

    try {
      const param1 = 1;
      const param2 = '홍길동';
      const param3 = '서울특별시';

      const rs = await queryRunner.query(`
        insert into User (id, name, address) values (?, ?, ?)
        `, [param1, param2, param3]);

      this.logger.log(JSON.stringify(rs));
    } catch (error) {
      this.logger.error(error)
    } finally {
      await queryRunner.release();
      this.logger.log('released');
    }
    return true;
  }

  async getUserWithTran(): Promise<boolean> {
    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const param1 = 2;
      const param2 = '홍길동';
      const param3 = '부산광역시';

      const rs = await queryRunner.query(`
        insert into User (id, name, address) values (?, ?, ?)
        `, [param1, param2, param3]);

      this.logger.log(JSON.stringify(rs));

      await queryRunner.commitTransaction();
      this.logger.log('commitTransaction');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(error)
      this.logger.error('rollbackTransaction');
    } finally {
      await queryRunner.release();
      this.logger.log('released');
    }
    return true;
  }

}
