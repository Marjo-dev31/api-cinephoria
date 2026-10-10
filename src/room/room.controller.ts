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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiCreationErrorResponses } from '../helpers/swagger-error-responses';

@ApiTags('Salles')
@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    @Roles(['admin'])
    @ApiCreationErrorResponses({ authenticated: true })
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

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateRoom: UpdateRoomDto) {
        return this.roomService.updateRoom(id, updateRoom);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.roomService.remove(id);
    }
}
