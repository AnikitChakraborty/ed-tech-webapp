import { Injectable } from '@nestjs/common';
import { createCourseDto } from 'src/common/dto/create-course.dto';
import { Course } from 'src/schemas/course.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CourseFilterDto } from 'src/common/dto/course-filter.dto';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async createCourse(createCourse: createCourseDto): Promise<any> {
    const newCourse = new this.courseModel(createCourse);

    await newCourse.save();

    return {
      success: true,
      message: 'Course Created Successfully',
      course: newCourse,
    };
  }

  async filterCourses(query: CourseFilterDto) {
    const queryObj = { ...query };
    console.log(queryObj);
    return this.courseModel.find(queryObj);
  }
}
