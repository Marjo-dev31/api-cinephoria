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
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthGuard } from '../user/auth.guard';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    // roleguard

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createMovieDto: CreateMovieDto) {
        return this.moviesService.create(createMovieDto);
    }

    @Get()
    findAll() {
        return this.moviesService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('sales')
    findAllSales() {
        return this.moviesService.findAllSales();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.moviesService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
        return this.moviesService.update(id, updateMovieDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.moviesService.remove(id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id/favorite')
    isFavorite(@Param('id') id: string, @Body() isFavorite: boolean) {
        return this.moviesService.isFavorite(id, isFavorite);
    }
}
