import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // need to know
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer'; // need to know
import { extname } from 'path';
import { callbackify } from 'util';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { VideosModule } from './videos/videos.module';
import { CoursesModule } from './courses/courses.module';
import { AuthMiddleware } from './common/middleware/Authencation.middleware';
import { ParseUserMiddleware } from './common/middleware/ParseUser.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_LOCAL_URI'),
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Serve files from "uploads" folder
      serveRoot: '/uploads', // Expose via this URL
    }),
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // ✅ uses env variable
      }),
      inject: [ConfigService],
    }),
    VideosModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule], // Export JwtModule to make it global
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ParseUserMiddleware).forRoutes('*');
    consumer.apply(AuthMiddleware).forRoutes('courses/upload');
  }
}
