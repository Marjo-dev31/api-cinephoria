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
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiInternalServerErrorResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Films')
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    @ApiBadRequestResponse({
        description:
            'Les données envoyées ne respectent pas le format attendu.',
        schema: {
            example: {
                statusCode: 400,
                message: [
                    'title should not be empty',
                    'minimum_Age must be a number conforming to the specified constraints',
                ],
                error: 'Bad Request',
            },
        },
    })
    @ApiUnauthorizedResponse({
        description: "Le jeton d'authentification est absent ou invalide.",
        schema: {
            example: {
                statusCode: 401,
                message: 'Unauthorized',
            },
        },
    })
    @ApiInternalServerErrorResponse({
        description:
            'La création du film a échoué lors de son enregistrement en base de données.',
        schema: {
            example: {
                statusCode: 500,
                message: 'Internal server error',
            },
        },
    })
    create(@Body() createMovieDto: CreateMovieDto) {
        return this.moviesService.create(createMovieDto);
    }

    @Get()
    findAll() {
        return this.moviesService.findAll();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('sales')
    findAllSales() {
        return this.moviesService.findAllSales();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.moviesService.findOne(id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
        return this.moviesService.update(id, updateMovieDto);
    }

    @ApiBearerAuth()
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
