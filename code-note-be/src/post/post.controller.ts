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
import { PatchPostDto } from './dto/patch-post.dto';
import { PostService } from './providers/post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  getAll() {
    return this.postService.getAllPost();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
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
  @Patch(':id')
  patchPost(@Param('id') id: string, @Body() patchPostDto: PatchPostDto) {
    return this.postService.updatePost(id, patchPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
