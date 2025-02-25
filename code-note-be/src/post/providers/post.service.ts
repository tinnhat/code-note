import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  public getAllPost(): string {
    return 'Hello World!';
  }

  public getPostById(id: number) {
    return {
      id: id,
      title: '1312',
      description: '12312',
      code: [],
    };
  }

  public async createPost(createPostDto: CreatePostDto) {
    return await this.postRepository.save(createPostDto);
  }
}
