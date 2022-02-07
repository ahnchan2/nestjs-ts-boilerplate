import { Injectable, Catch } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { getSqljsManager, getConnection, getManager, Connection, QueryRunner } from "typeorm";
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
@Catch()
export class UsersRepository {
  constructor(
    // @InjectConnection()
    // private connection: Connection,
  ) {}

  async selectUserByIdInOracle(id: number, queryRunner:QueryRunner=null) {
    const rs = await getConnection('oracle').query(`
      SELECT
          EMPLOYEE_ID 
          ,FIRST_NAME 
          ,LAST_NAME 
          ,HIRE_DATE
          ,DEPARTMENT_ID 
      FROM
          EMPLOYEES
      WHERE 1=1
          AND EMPLOYEE_ID = :0
    `, [id], queryRunner);

    return rs;
  }

  async selectUserByIdInMySQL(id: number, queryRunner:QueryRunner=null) {
    const rs = await getConnection('mysql').query(`
      SELECT
          id 
          ,name
          ,address
      FROM
          User
      WHERE 1=1
          AND id = ?
    `, [id], queryRunner);

    return rs;
  }

  async insertUserInOracle(id: number, queryRunner:QueryRunner=null) {
    const rs = await getConnection('oracle').query(`
    INSERT INTO test VALUES (:0, '홍길동', '서울시 강남구')
    `, [id], queryRunner);

    return rs;
  }

  async insertUserInMySQL(id: number, queryRunner:QueryRunner=null) {
    const rs = await getConnection('mysql').query(`
      INSERT into User values (?, '홍길동', '서울시 강남구')
    `, [id], queryRunner);

    return rs;
  }

  async sleepOracle(sec: number, queryRunner:QueryRunner=null) {
    const rs = await getConnection('oracle').query(`
      SELECT hr.fn_sleep(:0) as result FROM dual
    `, [sec], queryRunner);

    return rs;
  }


  async sleepMySQL(sec: number, queryRunner:QueryRunner=null) {
    const rs = await getConnection('mysql').query(`
      SELECT SLEEP(?)
    `, [sec], queryRunner);

    return rs;
  }

  async divide(num: number) {
    await new Promise(r => setTimeout(r, 1000));

    if (num !== 0) {
      const rs = 100 / num;
      return rs;
    } else {
      throw Error('can not divide zero.');
    }
  }
  
}
