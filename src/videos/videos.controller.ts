import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Request,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

//import { CreateVideoDto } from 'src/common/dto/create-video.dto';
import { VideosService } from './videos.service';
import { diskStorage } from 'multer';
import { callbackify } from 'util';
import { extname, join } from 'path';
import {
  FilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { CreateVideoDto } from 'src/common/dto/create-video.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'thumbnail', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, callback) => {
            // Set destination based on fieldname
            const folder =
              file.fieldname === 'thumbnail' ? 'thumbnails' : 'videos';
            const uploadPath = join(__dirname, '..', '..', 'uploads', folder);
            callback(null, uploadPath);
          },
          filename: (req, file, callback) => {
            // Generate a unique filename
            const uniqueName = `${Date.now()}-${file.originalname}`;
            callback(null, uniqueName);
          },
        }),
      },
    ),
  )
  async uploadFile(
    @Request() req: any,
    @Body() createVideoDto: CreateVideoDto,
    @UploadedFiles()
    files: {
      thumbnail?: Express.Multer.File[];
      video?: Express.Multer.File[];
    },
  ) {
    const userInfo = (req as any).userInfo;
    console.log('User Info:', userInfo);

    console.log('files', files);

    const thumbnailPath = files.thumbnail
      ? `/uploads/thumbnails/${files.thumbnail[0].filename}`
      : null;
    const videoPath = files.video
      ? `/uploads/videos/${files.video[0].filename}`
      : null;

    createVideoDto.thumbnail_link = thumbnailPath;
    createVideoDto.video_link = videoPath;

    createVideoDto.teacher = userInfo.sub;

    // Save to the database
    const videoData = await this.videosService.createVideo(createVideoDto);

    return {
      success: true,
      message: 'Files uploaded and saved',
      video: videoData,
    };
  }
}
