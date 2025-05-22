import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      let role: Role | null = null;

      if (createUserDto.role_id !== undefined) {
        role = await this.roleRepo.findOneBy({
          role_id: createUserDto.role_id,
        });
      } else {
        role = await this.roleRepo.findOneBy({ role_id: 1 });
      }

      if (!role) {
        throw new NotFoundException(
          `Role with ID ${createUserDto.role_id} not found`,
        );
      }

      const existingUser = await this.userRepo.findOneBy({
        email: createUserDto.email,
      });
      if (existingUser) {
        throw new BadRequestException(
          `User with email ${createUserDto.email} already exists`,
        );
      }

      const user = this.userRepo.create({
        ...createUserDto,
        role_id: role,
      });

      return await this.userRepo.save(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to create user: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      return this.userRepo.find({ relations: ['role_id'] });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch users: ${error.message}`,
      );
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepo.findOne({
        where: { user_id: id },
        relations: ['role_id'],
      });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to fetch user: ${error.message}`,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepo.findOneBy({ user_id: id });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      Object.assign(user, updateUserDto);
      return await this.userRepo.save(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to update user: ${error.message}`,
      );
    }
  }
}
