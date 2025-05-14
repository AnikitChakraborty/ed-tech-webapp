import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Courses {
  @Prop({ required: true })
  banner_link: string;

  @Prop({ type: Types.ObjectId, req: 'Video', required: true })
  videos: Types.ObjectId;

  @Prop({ required: true })
  description: string;

  no_of_lacture: number;

  total_time: number;

  @Prop({ type: Types.ObjectId, req: 'Video', required: true })
  teacher: Types.ObjectId;

  price: number;
}

export const CoursesSchema = SchemaFactory.createForClass(Courses);
