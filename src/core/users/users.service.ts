import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { Model } from 'mongoose';
import { NotesService } from '../notes/notes.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => NotesService)) private notesService: NotesService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    await this.checkDuplicateName(createUserDto.name);
    return this.userModel.create(createUserDto);
  }

  async findByName(name: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ name }).exec();
    this.handleNotFound(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    this.handleNotFound(user);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(id);
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<User> {
    await this.findOne(id);
    await this.notesService.deleteByUserId(id);
    return this.userModel.findByIdAndDelete(id).exec();
  }

  private async checkDuplicateName(name: string): Promise<void> {
    const user = await this.userModel.findOne({ name }).exec();
    if (user) {
      throw new HttpException(
        'User name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private handleNotFound(userData: any): void {
    if (!userData) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
