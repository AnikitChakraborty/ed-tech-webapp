import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export enum UserType {
  teacher = 'teacher',
  student = 'student',
}

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  user_img: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: UserType.student })
  userType: UserType;
}
export const UserSchema = SchemaFactory.createForClass(User);
