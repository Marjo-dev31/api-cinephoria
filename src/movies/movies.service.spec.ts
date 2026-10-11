import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { MOVIE_REPOSITORY } from './constants';
import { DYNAMODB_DOCUMENT_CLIENT } from '../config/dynamodb.providers';

describe('MoviesService', () => {
    let service: MoviesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MoviesService,
                { provide: MOVIE_REPOSITORY, useValue: 'MOVIE_REPOSITORY' },
                {
                    provide: DYNAMODB_DOCUMENT_CLIENT,
                    useValue: 'DYNAMODB_DOCUMENT_CLIENT',
                },
            ],
        }).compile();

        service = module.get<MoviesService>(MoviesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
