import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createCourseDto } from 'src/common/dto/create-course.dto';
import { query } from 'express';
import { CourseFilterDto } from 'src/common/dto/course-filter.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('course_banner', {
      storage: diskStorage({
        destination: './uploads/banner/',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.random()}`;
          const fileExt = file.originalname.split('.').pop();
          const filename = `${file.fieldname}-${uniqueSuffix}.${fileExt}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async crateCourse(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCourse: createCourseDto,
  ) {
    const bannerUrl = file ? `/uploads/banner/${file.filename}` : null;
    createCourse.course_banner = bannerUrl;
    return this.courseService.createCourse(createCourse);
  }

  @Get()
  async filterCourses(@Query() query: CourseFilterDto) {
    console.log(query);
    return this.courseService.filterCourses(query);
  }
}
