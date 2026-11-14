import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MOVIE_REPOSITORY } from './constants';
import { DYNAMODB_DOCUMENT_CLIENT } from '../config/dynamodb.providers';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('MoviesController', () => {
    let controller: MoviesController;
    const mockJwtService: Partial<JwtService> = {};
    const mockConfigService: Partial<ConfigService> = {
        get: jest.fn(),
    };
    const movies = [
        {
            id: 'movie-1',
            title: 'Interstellar',
            description: 'Une expédition au-delà de notre galaxie.',
            image_Url: '/uploads/interstellar.jpg',
            minimum_Age: 10,
            is_Favorite: false,
        },
    ];
    const movieRepository = {
        find: jest.fn().mockResolvedValue(movies),
    };

    beforeEach(async () => {
        movieRepository.find.mockClear();

        const module: TestingModule = await Test.createTestingModule({
            controllers: [MoviesController],
            providers: [
                MoviesService,
                { provide: MOVIE_REPOSITORY, useValue: movieRepository },
                {
                    provide: DYNAMODB_DOCUMENT_CLIENT,
                    useValue: { send: jest.fn() },
                },
                { provide: JwtService, useValue: mockJwtService as JwtService },
                {
                    provide: ConfigService,
                    useValue: mockConfigService as ConfigService,
                },
            ],
        }).compile();

        controller = module.get<MoviesController>(MoviesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return movie from controller to repository via service', async () => {
        await expect(controller.findAll()).resolves.toEqual(movies);

        expect(movieRepository.find).toHaveBeenCalledWith({
            relations: {
                genre: true,
                reviews: true,
                showing: {
                    room: { cinema: true },
                },
            },
        });
    });
});
