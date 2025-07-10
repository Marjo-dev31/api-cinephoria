import { Test, TestingModule } from '@nestjs/testing';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { GENRE_REPOSITORY } from './constants';

describe('GenreController', () => {
    let controller: GenreController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GenreController],
            providers: [
                GenreService,
                { provide: GENRE_REPOSITORY, useValue: 'GENRE_REPOSITORY' },
            ],
        }).compile();

        controller = module.get<GenreController>(GenreController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
