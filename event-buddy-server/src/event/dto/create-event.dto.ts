import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsDateString,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  @IsNotEmpty()
  date_time: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsInt()
  @IsNotEmpty()
  total_seats: number;

  @IsInt()
  @IsNotEmpty()
  available_seats: number;

  @IsInt()
  @IsNotEmpty()
  total_booked: number;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
