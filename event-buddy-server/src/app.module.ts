import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingModule } from './booking/booking.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { Event } from './event/entities/event.entity';
import { Booking } from './booking/entities/booking.entity';
import { Role } from './role/entities/role.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    EventModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.db'],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [Event, Booking, Role, User],
        synchronize: true,
      }),
    }),

    BookingModule,

    UserModule,

    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
