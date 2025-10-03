import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeatService } from './seat.service';
import { UpdateSeatDto } from './dto/update-seat.dto';

@Controller('seat')
export class SeatController {
    constructor(private readonly seatService: SeatService) {}

    @Get()
    findAll() {
        return this.seatService.findAll();
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
        return this.seatService.update(id, updateSeatDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.seatService.remove(id);
    }
}
