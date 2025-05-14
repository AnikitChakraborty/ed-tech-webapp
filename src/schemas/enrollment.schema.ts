import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Enrollment {
  @Prop()
  @Prop({ type: Types.ObjectId, req: 'User', required: true })
  student: Types.ObjectId;

  @Prop({ type: Types.ObjectId, req: 'Course', required: true })
  courses: Types.ObjectId;

  @Prop({ type: Date, default: Date.now, immutable: true })
  createdAt: Date;
}
export const enrollmentSchema = SchemaFactory.createForClass(Enrollment);
