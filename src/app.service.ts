import { Injectable, Inject, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import AppConfig from './config/app/config';
// import MySqlConfig from './config/database/mysql/config';
// import { getConnection, getManager, Connection } from "typeorm";
// import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    // env test
    @Inject(AppConfig.KEY)
    private readonly appConfig: ConfigType<typeof AppConfig>,

    // @InjectConnection()
    // private connection: Connection,
  ) {}

  getHello(): string {
    // this.getUserByMySQL();
    // this.getUserWithTranByMySQL();
    // this.getUserByOracle();
    
    // env test
    return 'Hello World!, running in....' + this.appConfig.env;
  }

  // async getUserByMySQL(): Promise<boolean> {
  //   const queryRunner = this.connection.createQueryRunner();
  //   await queryRunner.connect();

  //   try {
  //     const param1 = 1;
  //     const param2 = '홍길동';
  //     const param3 = '서울특별시';

  //     const rs = await queryRunner.query(`
  //       select
  //         id
  //         ,name
  //         ,address
  //       from User
  //       where 1=1
  //       and id = ?
  //       `, [param1]);

  //     this.logger.log(JSON.stringify(rs));
  //   } catch (error) {
  //     this.logger.error(error)
  //   } finally {
  //     await queryRunner.release();
  //     this.logger.log('released');
  //   }
  //   return true;
  // }

  // async getUserWithTranByMySQL(): Promise<boolean> {
  //   const queryRunner = this.connection.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();

  //   try {
  //     const param1 = 2;
  //     const param2 = '홍길동';
  //     const param3 = '부산광역시';

  //     const rs = await queryRunner.query(`
  //       select
  //         id
  //         ,name
  //         ,address
  //       from User
  //       where 1=1
  //       and id = ?
  //       `, [param1]);

  //     this.logger.log(JSON.stringify(rs));

  //     await queryRunner.commitTransaction();
  //     this.logger.log('commitTransaction');
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     this.logger.error(error)
  //     this.logger.error('rollbackTransaction');
  //   } finally {
  //     await queryRunner.release();
  //     this.logger.log('released');
  //   }
  //   return true;
  // }

  // async getUserByOracle(): Promise<boolean> {
  //   const queryRunner = this.connection.createQueryRunner();
  //   await queryRunner.connect();

  //   try {
  //     const param1 = 110;

  //     const rs = await queryRunner.query(`
  //         SELECT
  //             EMPLOYEE_ID 
  //             ,FIRST_NAME 
  //             ,LAST_NAME 
  //             ,HIRE_DATE
  //             ,DEPARTMENT_ID 
  //         FROM
  //             EMPLOYEES
  //         WHERE 1=1
  //             AND EMPLOYEE_ID = :0
  //       `, [param1]);

  //     this.logger.log(JSON.stringify(rs));
  //   } catch (error) {
  //     this.logger.error(error)
  //   } finally {
  //     await queryRunner.release();
  //     this.logger.log('released');
  //   }
  //   return true;
  // }

}
