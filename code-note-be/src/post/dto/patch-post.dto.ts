import { CreatePostDto } from './create-post.dto';
import { PartialType } from '@nestjs/mapped-types';
export class PatchPostDto extends PartialType(CreatePostDto) {}
