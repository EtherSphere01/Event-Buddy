import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import * as fs from 'fs/promises';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { json } from 'stream/consumers';
import { Booking } from 'src/booking/entities/booking.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const originalImagePath = createEventDto.image;

    try {
      await fs.access(originalImagePath);
    } catch {
      throw new BadRequestException(
        'Image file not found at path: ' + originalImagePath,
      );
    }

    const imageBuffer = await fs.readFile(originalImagePath);
    if (imageBuffer.length > 5 * 1024 * 1024) {
      throw new BadRequestException('Maximum image size is 5MB');
    }

    if (!['.jpg', '.jpeg', '.png'].includes(path.extname(originalImagePath))) {
      throw new BadRequestException('Invalid image format');
    }
    const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const ext = path.extname(originalImagePath);
    const fileName = `event_${Date.now()}${ext}`;
    const savedImagePath = path.join(uploadsDir, fileName);

    await fs.copyFile(originalImagePath, savedImagePath);

    const relativeImagePath = `/uploads/${fileName}`;

    const event = this.eventRepository.create({
      ...createEventDto,
      image_path: relativeImagePath,
      date: new Date(createEventDto.date),
      start_time: createEventDto.start_time,
      end_time: createEventDto.end_time,
    });

    try {
      return await this.eventRepository.save(event);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating event: ' + error.message,
      );
    }
  }

  async findAll() {
    try {
      const events = this.eventRepository.find();
      if (!events) {
        throw new NotFoundException('No events found');
      }
      return events;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error fetching events: ' + error.message,
      );
    }
  }

  async findOne(id: number) {
    try {
      const event = await this.eventRepository.findOne({
        where: { event_id: id },
      });
      if (!event) {
        throw new NotFoundException(`Event with ID ${id} not found`);
      }
      return event;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error fetching event: ' + error.message,
      );
    }
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    try {
      const event = await this.eventRepository.findOne({
        where: { event_id: id },
      });
      if (!event) {
        throw new NotFoundException(`Event with ID ${id} not found`);
      }

      const updatedEvent = Object.assign(event, updateEventDto);
      return await this.eventRepository.save(updatedEvent);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error updating event: ' + error.message,
      );
    }
  }

  async remove(id: number) {
    const event = await this.eventRepository.findOneBy({ event_id: id });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    try {
      await this.bookingRepo
        .createQueryBuilder()
        .update('bookings')
        .set({ event: null })
        .where('event_id = :id', { id })
        .execute();

      await this.eventRepository.remove(event);

      return { message: `Event #${id} deleted successfully` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error deleting event: ' + error.message,
      );
    }
  }
}
