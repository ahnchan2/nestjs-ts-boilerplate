import { Injectable, Logger, Catch } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { getSqljsManager, getConnection, getManager, Connection } from "typeorm";
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
@Catch()
export class UsersRepository {
  constructor(
    // @InjectConnection()
    // private connection: Connection,
  ) {}

  async selectUserByIdInOracle(id: number) {
    const rs = await getConnection().query(`
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
    `, [id]);

    return rs;
  }

  async selectUserByIdInMySQL(id: number) {
    const rs = await getConnection().query(`
      SELECT
          id 
          ,name
          ,address
      FROM
          User
      WHERE 1=1
          AND id = ?
    `, [id]);

    return rs;
  }

  async sleepOracle(sec: number) {
    const rs = await getConnection().query(`
      SELECT hr.fn_sleep(:0) as result FROM dual
    `, [sec]);

    return rs;
  }


  async sleepMySQL(sec: number) {
    const rs = await getConnection().query(`
      SELECT SLEEP(?)
    `, [sec]);

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
