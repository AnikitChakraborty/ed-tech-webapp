import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Course {
  @Prop({ required: true })
  course_name: string;

  @Prop({ required: true })
  course_banner: string;

  // @Prop({ type: Types.ObjectId, req: 'Video', required: true })
  // videos: Types.ObjectId;

  @Prop({ required: true })
  description: string;

  @Prop()
  no_of_lactures: number;

  @Prop()
  total_time: number;

  @Prop({ type: Types.ObjectId, req: 'User', required: true })
  teacher: Types.ObjectId;

  price: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
