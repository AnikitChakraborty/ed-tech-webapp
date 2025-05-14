import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from 'src/common/dto/create-video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from 'src/schemas/video.schema';
@Injectable()
export class VideosService {
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

  async createVideo(createVideoDto: CreateVideoDto): Promise<any> {
    const newVideo = new this.videoModel(createVideoDto);
    await newVideo.save();
    return {
      success: true,
      message: 'Video created successfully',
      data: newVideo,
    };
  }
}
