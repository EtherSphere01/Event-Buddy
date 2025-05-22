import { Booking } from 'src/booking/entities/booking.entity';
import { Role } from 'src/role/entities/role.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @Column({ type: 'varchar', length: 100, nullable: false })
  full_name: string;
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    primary: true,
    unique: true,
  })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role_id: Role;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
