/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({ each: true }) // Đảm bảo tất cả phần tử trong mảng là string
  code: string[];
}
