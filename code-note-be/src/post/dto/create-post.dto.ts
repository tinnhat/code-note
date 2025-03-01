/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CodeItemDto } from './code-item.dts';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ValidateNested({ each: true }) // Kiểm tra từng phần tử trong mảng
  @Type(() => CodeItemDto) // Chuyển đổi mỗi phần tử thành CodeItemDto
  code: CodeItemDto[];
  @IsString()
  @IsNotEmpty()
  type: string;
}
