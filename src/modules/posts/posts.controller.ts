import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostsService } from './posts.service';

@ApiTags()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOkResponse({ description: 'Post created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid details' })
  createPost(@Body() dto: CreatePostDto) {
    return this.postsService.createPost(dto);
  }

  @Get()
  @ApiOkResponse({ description: 'Posts fetched successfully' })
  @ApiBadRequestResponse({ description: 'No Post found' })
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Post retrieved successfully' })
  @ApiBadRequestResponse({ description: 'Post not found' })
  @ApiBadGatewayResponse({ description: 'Invalid objectId' })
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }

  @Put('/:id')
  @ApiOkResponse({ description: 'Post updated successfully' })
  @ApiBadRequestResponse({ description: 'Nothing to update OR Post not found' })
  @ApiBadGatewayResponse({ description: 'Invalid objectId' })
  updatePost(@Param('id') postId: string, @Body() dto: UpdatePostDto) {
    return this.postsService.updatePost(postId, dto);
  }

  @Delete('/:id')
  @ApiOkResponse({ description: 'Post deleted successfully' })
  @ApiBadRequestResponse({ description: 'Post not found or unable to delete' })
  @ApiBadGatewayResponse({ description: 'Invalid objectId' })
  deletePost(@Param('id') postId: string) {
    return this.postsService.deletePost(postId);
  }
}
