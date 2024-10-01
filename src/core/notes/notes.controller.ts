import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './schemas/notes.schema';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post(':id')
  async create(
    @Param('id') userId: string,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    return await this.notesService.create(createNoteDto, userId);
  }

  @Get()
  async findAll(): Promise<Note[]> {
    return await this.notesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Note> {
    return await this.notesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    return await this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Note> {
    return await this.notesService.delete(id);
  }
}
