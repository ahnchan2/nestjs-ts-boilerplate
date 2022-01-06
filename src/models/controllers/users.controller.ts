import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse,  } from '@nestjs/swagger';

@Controller('users')
@ApiTags('유저 API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: '유저 조회 API', description: '유저를 조회한다.' })
  async findOne(@Param('id') id: string) {
    // return this.usersService.findOne(+id);
    return this.usersService.getUser(+id)
  }

  @Post()
  @ApiOperation({ summary: '유저 조회 API', description: 'DTO 방식으로 유저를 조회한다.' })
  findOneByDTO(@Body() createUserDto: CreateUserDto) {
    return this.usersService.getUserByDTO(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
