import { Injectable } from '@nestjs/common';
import { createCourseDto } from 'src/common/dto/create-course.dto';
import { Course } from 'src/schemas/course.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async createCourse(createCourse: createCourseDto): Promise<any> {
    const existCourse = await this.courseModel
      .findOne({ course_name: createCourse.course_name })
      .exec();

    if (existCourse) {
      return {
        success: false,
        message: 'Course aldready exists',
      };
    }
    const newCourse = new this.courseModel(createCourse);

    await newCourse.save();

    return {
      success: true,
      message: 'Course Created Successfully',
      course: newCourse,
    };
  }
  async getAllCourses() {
    return this.courseModel.find();
  }
}
