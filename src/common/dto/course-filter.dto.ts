import { IsOptional, IsString } from 'class-validator';

export class CourseFilterDto {
  @IsOptional()
  @IsString()
  course_name?: string;

  @IsOptional()
  @IsString()
  teacher?: string;
}
