import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiCreationErrorResponses } from '../helpers/swagger-error-responses';

@ApiTags('Genres')
@Controller('genre')
export class GenreController {
    constructor(private readonly genreService: GenreService) {}

    @Get()
    findAll() {
        return this.genreService.findAll();
    }

    @Post()
    @ApiCreationErrorResponses()
    create(@Body() createGenreDto: CreateGenreDto) {
        return this.genreService.create(createGenreDto);
    }
}
