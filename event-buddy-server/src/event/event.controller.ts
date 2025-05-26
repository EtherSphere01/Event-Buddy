import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Roles('Admin')
  @Post('create')
  async create(@Body() createEventDto: CreateEventDto, @Res() res) {
    console.log(res.body);
    return await this.eventService.create(createEventDto);
  }

  @Auth(AuthType.None)
  @Get()
  async findAll() {
    return await this.eventService.findAll();
  }

  @Auth(AuthType.None)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.eventService.findOne(+id);
  }

  @Roles('Admin')
  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return await this.eventService.update(+id, updateEventDto);
  }

  @Roles('Admin')
  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.eventService.remove(+id);
  }
}
