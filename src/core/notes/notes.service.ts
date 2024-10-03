import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteDocument } from './schemas/notes.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private NoteModel: Model<NoteDocument>,
    private usersService: UsersService,
  ) {}

  async create(createNoteDto: CreateNoteDto, userId: string): Promise<Note> {
    const user = await this.usersService.findOne(userId);
    const newNote = await new this.NoteModel({
      ...createNoteDto,
      user: user.id,
    }).save();

    user.notes.push(newNote._id);
    await user.save();

    return newNote;
  }

  async findAll(): Promise<Note[]> {
    return await this.NoteModel.find()
      .populate({
        path: 'user',
        select: '_id name',
      })
      .exec();
  }

  async findOne(id: string): Promise<Note> {
    return await this.NoteModel.findById(id)
      .populate({
        path: 'user',
        select: '_id name',
      })
      .exec();
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    return await this.NoteModel.findByIdAndUpdate(id, updateNoteDto).exec();
  }

  async delete(id: string): Promise<Note> {
    return await this.NoteModel.findByIdAndDelete(id).exec();
  }
}
