import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse,  } from '@nestjs/swagger';

@Controller('users')
@ApiTags('유저 API')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Get('info/:id')
  @ApiOperation({ summary: '유저 조회 API', description: '유저를 조회한다.' })
  async findOne(@Param('id') id: string) {
    return await this.usersService.getUser(+id)
  }

  @Post('info')
  @ApiOperation({ summary: '유저 조회 API', description: 'DTO 방식으로 유저를 조회한다.' })
  async findOneByDTO(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.getUserByDTO(createUserDto);
  }

  @Get('async-test')
  @ApiOperation({ summary: 'async 테스트 API', description: 'async 테스트' })
  async async() {
    this.logger.log(`Start /users/async api, ${process.pid} , ${new Date().toLocaleString()}`)
    const sec: number[] = [10, 30];
    let res = {}
    const res_oracle = await this.usersService.sleepOracle(sec);
    const res_mysql = await this.usersService.sleepMySQL(sec);

    res['res_oracle'] = res_oracle;
    res['res_mysql'] = res_mysql;
    res['controller'] = `hello, pid ${process.pid}`;
    this.logger.log(`End /users/async api, ${process.pid} , ${new Date().toLocaleString()}`);
    return res;
  }
  @Get('exception-test/:num')
  @ApiOperation({ summary: 'Exception 테스트 API', description: 'Exception 테스트' })
  async exceptionTest(@Param('num') num: string) {
    return await this.usersService.exceptionTest(+num);
  }

  @Get('transaction-test/:oracleId/:mysqlId')
  @ApiOperation({ summary: 'Transaction 테스트 API', description: 'Transaction 테스트' })
  async transactionTest(@Param('oracleId') oracleId: string, @Param('mysqlId') mysqlId: string) {
    this.logger.log('START transaction-test API')
    let ids: number[] = [+oracleId, +mysqlId];
    return await this.usersService.multipleTransactionTest(ids);
  }
}
