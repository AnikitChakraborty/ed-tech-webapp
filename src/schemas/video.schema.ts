import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export enum PrivacyType {
  public = 'public',
  private = 'private',
}

export enum isFree {
  free = 'free',
  paid = 'paid',
}

@Schema()
export class Video {
  @Prop({ required: true })
  video_link: string;

  @Prop({ required: true })
  thumbnail_link: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: PrivacyType.public })
  privacyType: PrivacyType;

  @Prop({ required: true, default: isFree.paid })
  isFree: isFree;

  @Prop({ type: Types.ObjectId, req: 'User', required: true })
  teacher?: Types.ObjectId;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
