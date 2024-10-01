import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [UsersModule, NotesModule],
})
export class CoreModule {}
