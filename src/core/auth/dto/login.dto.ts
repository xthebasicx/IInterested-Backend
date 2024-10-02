import { ApiProperty } from '@nestjs/swagger';

export class loginDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  password: string;
}
