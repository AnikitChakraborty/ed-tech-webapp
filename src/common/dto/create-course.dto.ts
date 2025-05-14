import { Prop } from '@nestjs/mongoose';
import { IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class createCourseDto {
  @IsString()
  course_name: string;

  @IsOptional()
  @IsString()
  course_banner?: string;

  @IsString()
  description: string;

  @IsOptional()
  no_of_lactures: number;

  @IsOptional()
  total_time: number;

  @IsOptional()
  teacher: string;

  @IsOptional()
  price: number;
}
