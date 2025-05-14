import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer'; // neet to know
import { extname } from 'path';
import { callbackify } from 'util';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { VideosModule } from './videos/videos.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/ed-tech'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Serve files from "uploads" folder
      serveRoot: '/uploads', // Expose via this URL
    }),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // corrected from JWT_SECERET to JWT_SECRET
    }),
    VideosModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule], // Export JwtModule to make it global
})
export class AppModule {}
