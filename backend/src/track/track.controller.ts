import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
  UploadedFiles,
  Patch,
  Query
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ObjectId } from 'mongoose';
import { Track } from './schemas/track.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './schemas/comment.schema';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'trackFile', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]))
  create(@UploadedFiles() files, @Body() dto: CreateTrackDto): Promise<Track> {
    const { trackFile, image } = files;

    return this.trackService.create(dto, trackFile[0], image[0]);
  }

  @Get('get-all')
  getAll(@Query('offset') offset: number, @Query('count') count: number,): Promise<Array<Track>> {
    return this.trackService.getAll(offset, count);
  }

  @Get('search')
  search(@Query('search') search: string): Promise<Array<Track>> {
    return this.trackService.search(search);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId): Promise<Track> {
    return this.trackService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId): Promise<string> {
    return this.trackService.delete(id);
  }

  @Post('comment')
  addComment(@Body() dto: CreateCommentDto): Promise<Comment> {
    return this.trackService.addComment(dto);
  }

  @Patch('listen/:id')
  listen(@Param('id') id: ObjectId): Promise<number> {
    return this.trackService.listen(id);
  }
}
