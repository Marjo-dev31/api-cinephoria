import { Test, TestingModule } from '@nestjs/testing';
import { GenreService } from './genre.service';
import { GENRE_REPOSITORY } from './constants';

describe('GenreService', () => {
    let service: GenreService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GenreService,
                { provide: GENRE_REPOSITORY, useValue: 'GENRE_REPOSITORY' },
            ],
        }).compile();

        service = module.get<GenreService>(GenreService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
