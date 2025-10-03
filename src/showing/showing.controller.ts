import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { ShowingService } from './showing.service';
import { CreateShowingDto } from './dto/create-showing.dto';
import { UpdateShowingDto } from './dto/update-showing.dto';
import { AuthGuard } from '../user/auth.guard';

@Controller('showing')
export class ShowingController {
    constructor(private readonly showingService: ShowingService) {}

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createShowingDto: CreateShowingDto) {
        return this.showingService.create(createShowingDto);
    }

    @Get()
    findAll() {
        return this.showingService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.showingService.findOne(id);
    }

    @Get('room/:id')
    findShowingByRoomId(@Param('id') id: string) {
        return this.showingService.findShowingByRoomId(id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() UpdateShowingDto: UpdateShowingDto,
    ) {
        return this.showingService.update(id, UpdateShowingDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.showingService.remove(id);
    }
}
