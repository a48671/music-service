import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileService, FileTypeEnum } from '../file/file.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private readonly fileService: FileService
  ) {}

  async create(dto: CreateTrackDto, trackFile, image): Promise<Track> {
    const audio = this.fileService.createFile(FileTypeEnum.AUDIO, trackFile);
    const picture = this.fileService.createFile(FileTypeEnum.IMAGE, image);

    const track = await this.trackModel.create({ ...dto, listens: 0, audio, picture });

    return track;
  }

  async getAll(offset: number = 0, count: number = 10): Promise<Array<Track>> {
    return this.trackModel.find().skip(offset).limit(count);
  }

  async getOne(id: ObjectId): Promise<Track | null> {
    const track = await this.trackModel.findById(id);

    return track.populate('comments');
  }

  async delete(id: ObjectId): Promise<string> {
    const track = await this.trackModel.findByIdAndDelete(id);

    return String(track._id);
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create(dto);

    if (comment) {
      track.comments.push(comment._id);
    }

    track.save();

    return comment;
  }

  async listen(id: ObjectId): Promise<number> {
    const track = await this.trackModel.findById(id);

    track.listens += 1;

    await track.save();

    return track.listens
  }

  async search(search: string): Promise<Array<Track>> {
    return this.trackModel.find({ name: { $regex: new RegExp(search, 'i') } });
  }
}
