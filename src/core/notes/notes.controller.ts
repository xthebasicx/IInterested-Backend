import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './schemas/notes.schema';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    const userId = req.user.userId;
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
