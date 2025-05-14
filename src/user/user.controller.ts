import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { SetCookieInterceptor } from 'src/common/interceptors/tockenResponce.interceptor';
import { LoginDto } from 'src/common/dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UseInterceptors(SetCookieInterceptor)
  @UseInterceptors(
    FileInterceptor('user_img', {
      storage: diskStorage({
        destination: './uploads', // Directory where files will be stored
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const fileExt = file.originalname.split('.').pop();
          const filename = `${file.fieldname}-${uniqueSuffix}.${fileExt}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async createUser(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    const imageUrl = file ? `/uploads/${file.filename}` : null; // Update path based on storage location
    return this.userService.createUser(createUserDto, imageUrl);
  }

  @Post('login')
  @UseInterceptors(SetCookieInterceptor)
  async loginUser(@Body() loginDto: LoginDto) {
    return this.userService.loginUser(loginDto);
  }
}
