import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsMongoId,
} from 'class-validator';
import { PrivacyType, isFree } from 'src/schemas/video.schema';

export class CreateVideoDto {
  @IsOptional()
  @IsString()
  video_link: string;

  @IsOptional()
  @IsString()
  thumbnail_link: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional() // Optional because it has a default value in the schema
  @IsEnum(PrivacyType)
  privacyType?: PrivacyType;

  @IsOptional() // Optional because it has a default value in the schema
  @IsEnum(isFree)
  isFree?: isFree;

  @IsOptional()
  @IsMongoId()
  teacher: string; // Teacher ID should be a valid MongoDB ObjectId
}
