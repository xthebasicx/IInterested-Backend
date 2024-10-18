import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  details: string;

  @ApiProperty()
  image: string;
}
