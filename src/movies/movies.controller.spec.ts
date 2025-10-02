import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MOVIE_MONGO_REPOSITORY, MOVIE_REPOSITORY } from './constants';

describe('MoviesController', () => {
    let controller: MoviesController;

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
            ],
        }).compile();

        controller = module.get<MoviesController>(MoviesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
