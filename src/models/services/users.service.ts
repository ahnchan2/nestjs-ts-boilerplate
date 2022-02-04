import { Catch, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersRepository.name);
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async sleepOracle(sec: number[]) {
    let res = {};
    const res0 = await this.usersRepository.sleepOracle(sec[0]);
    const res1 = await this.usersRepository.sleepOracle(sec[1]);

    res['service_res0'] = res0;
    res['service_res1'] = res1;
    return res;
  }


  async sleepMySQL(sec: number[]) {
    let res = {};
    const res0 = await this.usersRepository.sleepMySQL(sec[0]);
    const res1 = await this.usersRepository.sleepMySQL(sec[1]);

    res['service_res0'] = res0;
    res['service_res1'] = res1;
    return res;
  }

  async getUser(id: number) {
    let rs = {};
    const oracleRs = await this.usersRepository.selectUserByIdInOracle(id);
    // const mysqlRs = await this.usersRepository.selectUserByIdInMySQL(id);
    rs['service_oracle_res'] = oracleRs;
    // rs['service_mysql_res'] = mysqlRs;
    return rs;
  }

  async getUserByDTO(createUserDto: CreateUserDto) {
    let rs = {};
    const oracleRs = await this.usersRepository.selectUserByIdInOracle(createUserDto.id);
    // const mysqlRs = await this.usersRepository.selectUserByIdInMySQL(createUserDto.id);
    rs['service_oracle_res'] = oracleRs;
    // rs['service_mysql_res'] = mysqlRs;
    return rs;
  }

  async exceptionTest(num: number) {
    try{
      return await this.usersRepository.divide(num);
    }catch(error){
      this.logger.error(`catch exception in service layer, ${error}`);
    }
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
