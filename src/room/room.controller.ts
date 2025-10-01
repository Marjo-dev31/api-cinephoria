import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
// import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Post()
    create(@Body() createRoomDto: CreateRoomDto) {
        return this.roomService.create(createRoomDto);
    }

    @Get()
    findAll() {
        return this.roomService.findAll();
    }

    @Get('id')
    findRoomById(@Param('id') id: string) {
        return this.roomService.findRoomById(id);
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() reservation: number) {
    //     return this.roomService.updateNumberOfSales(id, reservation);
    // }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateRoom: UpdateRoomDto) {
        return this.roomService.updateRoom(id, updateRoom);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.roomService.remove(id);
    }
}
