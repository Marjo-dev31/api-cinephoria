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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiCreationErrorResponses } from '../helpers/swagger-error-responses';

@ApiTags('Séances')
@Controller('showing')
export class ShowingController {
    constructor(private readonly showingService: ShowingService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    @ApiCreationErrorResponses({ authenticated: true })
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

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() UpdateShowingDto: UpdateShowingDto,
    ) {
        return this.showingService.update(id, UpdateShowingDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.showingService.remove(id);
    }
}
