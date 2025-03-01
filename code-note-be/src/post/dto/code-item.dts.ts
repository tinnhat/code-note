import { IsNotEmpty, IsString } from 'class-validator';

export class CodeItemDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}
