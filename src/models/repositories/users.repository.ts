import { Injectable, Logger, Catch } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { getSqljsManager, getConnection, getManager, Connection } from "typeorm";
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
@Catch()
export class UsersRepository {
  constructor(
    @InjectConnection()
    private connection: Connection,
  ) {}

  async selectUserById(id: number) {

    const rs = await this.connection.query(`
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

}
