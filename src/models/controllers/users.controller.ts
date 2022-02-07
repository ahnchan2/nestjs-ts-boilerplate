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

  @Get('async')
  @ApiOperation({ summary: 'async 테스트 API', description: 'async 테스트' })
  async async() {
    this.logger.log(`Start /users/async api, ${process.pid} , ${new Date().toLocaleString()}`)
    const sec: number[] = [10, 30];
    const res = await this.usersService.sleepOracle(sec);
    // const res = await this.usersService.sleepMySQL(sec);
    res['controller'] = `hello, pid ${process.pid}`;
    this.logger.log(`End /users/async api, ${process.pid} , ${new Date().toLocaleString()}`);
    return res;
  }

  @Get('user-info')
  @ApiOperation({ summary: '유저 조회 API', description: '유저를 조회한다.' })
  async findOne(@Param('id') id: string) {
    // return this.usersService.findOne(+id);
    return await this.usersService.getUser(+id)
  }

  @Post()
  @ApiOperation({ summary: '유저 조회 API', description: 'DTO 방식으로 유저를 조회한다.' })
  async findOneByDTO(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.getUserByDTO(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('exception-test/:num')
  @ApiOperation({ summary: 'Exception 테스트 API', description: 'Exception 테스트' })
  async exceptionTest(@Param('num') num: string) {
    return await this.usersService.exceptionTest(+num);
  }

  @Get('transaction-test')
  @ApiOperation({ summary: 'Transaction 테스트 API', description: 'Transaction 테스트' })
  async transactionTest(@Req() request: Request) {
    this.logger.log('START transaction-test API')
    let ids: number[] = [+request.query.oracleId, +request.query.mysqlId];
    return await this.usersService.multipleTransactionTest(ids);
  }
}
