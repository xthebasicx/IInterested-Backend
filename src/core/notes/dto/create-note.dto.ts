import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty()
  note_name: string;

  @ApiProperty()
  note_details: string;
}
