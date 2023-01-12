import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Track } from './track.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop()
  text: string;

  @Prop()
  userName: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Track' })
  trackId: Track;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
