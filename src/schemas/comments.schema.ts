import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Comments {
  @Prop({ type: Types.ObjectId, req: 'Course', required: true })
  course: Types.ObjectId;

  @Prop({ type: Types.ObjectId, req: 'User', required: true })
  owner: Types.ObjectId;

  @Prop({ require: true })
  content: string;

  @Prop({ type: Date, default: Date.now, immutable: true })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comments);
