import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './providers/post.service';
import { PatchPostDto } from './dto/patch-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  findAll() {
    return this.postService.getAllPost();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postService.getPostById(id);
  }

  @Post()
  create(@Body() request: CreatePostDto) {
    return this.postService.createPost(request);
  }
  // @Put(':id')
  // update(@Param('id') id: string) {
  //   return 'This action updates a #cat';
  // }
  @Patch()
  patchPost(@Body() patchPostDto: PatchPostDto) {
    return patchPostDto;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'This action removes a #cat';
  }
}
