import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePostDto, UpdatePostDto } from './dto';
import { Post } from './schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postsModel: Model<Post>,
  ) {}

  async createPost(payload: CreatePostDto) {
    const created = await this.postsModel.create(payload);
    return created;
  }

  async getAllPosts() {
    const posts = await this.postsModel.find({}).lean().exec();
    if (!posts || !posts.length) {
      throw new BadRequestException('No Post found');
    }
    return posts;
  }

  async getPostById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadGatewayException('Invalid objectId');
    }

    const objectId = new Types.ObjectId(id);
    const post = await this.postsModel.findById(objectId);
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    return post;
  }

  async updatePost(id: string, payload: UpdatePostDto) {
    if (!payload.content && !payload.title) {
      throw new BadRequestException('Nothing to update');
    }

    if (!Types.ObjectId.isValid(id)) {
      throw new BadGatewayException('Invalid objectId');
    }

    const objectId = new Types.ObjectId(id);
    const updated = await this.postsModel.findByIdAndUpdate(objectId, payload, {
      new: true,
    });
    if (!updated) {
      throw new BadRequestException('Post not found');
    }
    return updated;
  }

  async deletePost(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadGatewayException('Invalid objectId');
    }

    const objectId = new Types.ObjectId(id);
    const deleted = await this.postsModel.findByIdAndDelete(objectId);
    if (!deleted) {
      throw new BadRequestException('Unable to delete or post not found');
    }
    return deleted;
  }
}
