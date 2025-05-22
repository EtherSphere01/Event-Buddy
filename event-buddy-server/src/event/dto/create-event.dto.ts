import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsDateString,
  IsOptional,
  IsArray,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsDateString()
  @IsNotEmpty()
  date_time: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
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
