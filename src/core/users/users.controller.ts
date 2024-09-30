import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { User } from './schemas/users.schema';

@ApiTags('users')
@ApiHeader({ name: 'users' })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.register(createUserDto);
  }

  @Post('/login')
  async login(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.login(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }
}
