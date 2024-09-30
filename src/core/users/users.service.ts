import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    return new this.userModel(createUserDto).save();
  }

  async login(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel
      .findOne({
        user_name: createUserDto.user_name,
        user_password: createUserDto.user_password,
      })
      .exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
