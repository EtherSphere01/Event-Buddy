import { Event } from 'src/event/entities/event.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  booking_id: number;

  @Column({ type: 'int', nullable: false })
  seat_booked: number;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'email', referencedColumnName: 'email' })
  user: User;

  @ManyToOne(() => Event, (event) => event.bookings)
  @JoinColumn({ name: 'event_id', referencedColumnName: 'event_id' })
  event: Event;
}
