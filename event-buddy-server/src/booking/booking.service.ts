// src/booking/booking.service.ts
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { User } from 'src/user/entities/user.entity';
import { Event } from 'src/event/entities/event.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    try {
      const { email, event_id, seat_booked } = createBookingDto;

      const user = await this.userRepo.findOneBy({ email: email });
      if (!user) {
        const message = `User with email ${email} not found`;
        return { message };
      }

      const event = await this.eventRepo.findOneBy({ event_id: event_id });
      if (!event) {
        const message = `Event with id ${event_id} not found`;
        return { message };
      }

      if (seat_booked > event.available_seats) {
        const message = `Not enough seats available. Only ${event.available_seats} left.`;
        return { message };
      }

      const booking = this.bookingRepo.create({
        user,
        event,
        seat_booked: seat_booked,
      });

      event.available_seats -= seat_booked;
      event.total_booked += seat_booked;

      await this.eventRepo.save(event);
      return this.bookingRepo.save(booking);
    } catch (error) {
      return { message: 'Failed to create booking', error: error.message };
    }
  }

  async findAll() {
    try {
      return await this.bookingRepo.find({
        relations: ['event'],
      });
    } catch (error) {
      return { message: 'Failed to fetch bookings', error: error.message };
    }
  }

  async findOne(id: number) {
    try {
      const booking = await this.bookingRepo.findOne({
        where: { booking_id: id },
        relations: ['event'],
      });
      if (!booking) {
        const message = `Booking #${id} not found`;
        return { message };
      }
      return booking;
    } catch (error) {
      return {
        message: `Failed to fetch booking #${id}`,
        error: error.message,
      };
    }
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    try {
      const booking = await this.bookingRepo.findOne({
        where: { booking_id: id },
        relations: ['event'],
      });
      if (!booking) {
        const message = `Booking #${id} not found`;
        return { message };
      }

      if (updateBookingDto.seat_booked) {
        const seatDiff = updateBookingDto.seat_booked - booking.seat_booked;
        if (seatDiff > booking.event.available_seats) {
          const message = `Not enough seats available to update booking`;
          return { message };
        }

        booking.event.available_seats -= seatDiff;
        booking.event.total_booked += seatDiff;
        await this.eventRepo.save(booking.event);
      }

      if (updateBookingDto.status) {
        booking.status = updateBookingDto.status;
        if (updateBookingDto.status === 'Cancelled') {
          booking.event.available_seats += booking.seat_booked;
          booking.event.total_booked -= booking.seat_booked;
          await this.eventRepo.save(booking.event);
        }
      }

      Object.assign(booking, updateBookingDto);
      return this.bookingRepo.save(booking);
    } catch (error) {
      return {
        message: `Failed to update booking #${id}`,
        error: error.message,
      };
    }
  }

  async remove(id: number) {
    try {
      const booking = await this.bookingRepo.findOne({
        where: { booking_id: id },
        relations: ['event'],
      });
      if (!booking) {
        const message = `Booking #${id} not found`;
        return { message };
      }

      if (booking.event != null) {
        const event = await this.eventRepo.findOneBy({
          event_id: booking.event.event_id,
        });
        if (
          event &&
          booking.status != 'Cancelled' &&
          booking.status != 'Completed'
        ) {
          event.available_seats += booking.seat_booked;
          event.total_booked -= booking.seat_booked;
          await this.eventRepo.save(event);
        }
      }

      await this.bookingRepo.remove(booking);
      return { deleted: true, message: `Booking #${id} deleted successfully` };
    } catch (error) {
      return {
        message: `Failed to delete booking #${id}`,
        error: error.message,
      };
    }
  }
}
