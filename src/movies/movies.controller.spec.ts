import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MOVIE_MONGO_REPOSITORY, MOVIE_REPOSITORY } from './constants';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('MoviesController', () => {
    let controller: MoviesController;
    const mockJwtService: Partial<JwtService> = {};
    const mockConfigService: Partial<ConfigService> = {
        get: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MoviesController],
            providers: [
                MoviesService,
                { provide: MOVIE_REPOSITORY, useValue: 'MOVIE_REPOSITORY' },
                {
                    provide: MOVIE_MONGO_REPOSITORY,
                    useValue: 'MOVIE_MONGO_REPOSITORY',
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
});
