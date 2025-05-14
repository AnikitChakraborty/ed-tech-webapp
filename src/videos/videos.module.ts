import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from 'src/schemas/video.schema';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthMiddleware } from 'src/common/middleware/Authencation.middleware';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ed-tech'),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]), // Register the User schema here
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [VideosService],
  controllers: [VideosController],
})
export class VideosModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'videos/upload', method: RequestMethod.POST });
  }
}
