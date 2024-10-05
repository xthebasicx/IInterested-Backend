import {
  forwardRef,
  Inject,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteDocument } from './schemas/notes.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private noteModel: Model<NoteDocument>,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}

  async create(createNoteDto: CreateNoteDto, userId: string): Promise<Note> {
    await this.usersService.findOne(userId);
    const newNote = new this.noteModel({
      ...createNoteDto,
      user: userId,
    });
    return await newNote.save();
  }

  async findAll(): Promise<Note[]> {
    return await this.noteModel.find().populate('user').exec();
  }

  async findOne(id: string): Promise<Note> {
    const note = await this.noteModel.findById(id).populate('user').exec();
    this.handleNotFound(note);
    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const updatedNote = await this.noteModel
      .findByIdAndUpdate(id, updateNoteDto, { new: true })
      .exec();
    this.handleNotFound(updatedNote);
    return updatedNote;
  }

  async delete(id: string): Promise<Note> {
    const deletedNote = await this.noteModel.findByIdAndDelete(id).exec();
    this.handleNotFound(deletedNote);
    return deletedNote;
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.noteModel.deleteMany({ user: userId }).exec();
  }

  private handleNotFound(note: any): void {
    if (!note) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
