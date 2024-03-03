import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { postCreateInput } from './dto/post-create.input';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  getAllPosts() {
    return [];
  }

  @Post()
  @ApiOperation({ summary: 'Create a post' })
  createPost(@Body() inputDto: postCreateInput) {
    return {
      ...inputDto,
      success: true,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one post' })
  getOnePost(@Param('id', new ParseIntPipe()) id: number) {
    return {
      id: id,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a post' })
  updatePost(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() inputDto: postCreateInput,
  ) {
    return {
      ...inputDto,
      id: id,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  deletePost(@Param('id') id: string) {
    return {
      id: id,
      success: true,
    };
  }
}
