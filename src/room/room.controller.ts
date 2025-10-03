import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { AuthGuard } from '../user/auth.guard';
import { Roles } from '../role/roles-guard/roles.decorator';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @UseGuards(AuthGuard)
    @Post()
    @Roles(['admin'])
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

    @UseGuards(AuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateRoom: UpdateRoomDto) {
        return this.roomService.updateRoom(id, updateRoom);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.roomService.remove(id);
    }
}
