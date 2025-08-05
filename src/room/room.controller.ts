import {
    Controller,
    Get,
    // Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { RoomService } from './room.service';
// import { CreateRoomDto } from './dto/create-room.dto';
// import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    // @Post()
    // create(@Body() createroomDto: CreateroomDto) {
    //     return this.roomService.create(createRoomDto);
    // }

    @Get()
    findAll() {
        return this.roomService.findAll();
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.roomService.findOne(id);
    // }

    @Patch(':id')
    update(@Param('id') id: string, @Body() reservation: number) {
        return this.roomService.updateNumberOfSales(id, reservation);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.roomService.remove(id);
    }
}
