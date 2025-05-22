// src/booking/dto/create-booking.dto.ts
import {
  IsInt,
  IsEmail,
  Min,
  IsEmpty,
  IsOptional,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreateBookingDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @IsNotEmpty()
  event_id: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsInt()
  @Min(1)
  seat_booked: number;
}
