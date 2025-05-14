import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schma';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SetCookieInterceptor } from 'src/common/interceptors/tockenResponce.interceptor';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ed-tech'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register the User schema here
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`, // corrected from JWT_SECERET to JWT_SECRET
    }),
  ],
  providers: [
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: SetCookieInterceptor,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
