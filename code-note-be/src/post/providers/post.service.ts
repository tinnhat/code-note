/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { ObjectId } from 'mongodb';
import { isValidObjectId } from 'mongoose';
import { PatchPostDto } from '../dto/patch-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  public async getAllPost() {
    try {
      const posts = await this.postRepository.find();
      console.log(posts);
      return posts;
    } catch (error) {
      throw new BadRequestException('Failed to get all posts');
    }
  }

  public async getPostById(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    try {
      const post = await this.postRepository.findOneBy({
        _id: new ObjectId(id), // Dùng 'id' vì entity dùng 'id'
      });

      if (!post) {
        return new NotFoundException('Post not found');
      }
      return post;
    } catch (error) {
      throw new BadRequestException(`Failed to get post`);
    }
  }

  public async createPost(createPostDto: CreatePostDto) {
    try {
      return await this.postRepository.save(createPostDto);
    } catch (error) {
      throw new BadRequestException(`Failed to create post`);
    }
  }

  public async updatePost(id: string, updatePostDto: PatchPostDto) {
    try {
      await this.postRepository.update(id, updatePostDto);
      return await this.postRepository.findOneBy({ _id: new ObjectId(id) });
    } catch (error) {
      throw new BadRequestException(`Failed to update post`);
    }
  }

  public async deletePost(id: string) {
    try {
      return await this.postRepository.delete({ _id: new ObjectId(id) });
    } catch (error) {
      throw new BadRequestException(`Failed to delete post`);
    }
  }
}
