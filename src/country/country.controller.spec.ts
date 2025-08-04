import { Test, TestingModule } from '@nestjs/testing';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { COUNTRY_REPOSITORY } from './constants';

describe('CountryController', () => {
    let controller: CountryController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CountryController],
            providers: [
                CountryService,
                { provide: COUNTRY_REPOSITORY, useValue: 'COUNTRY_REPOSITORY' },
            ],
        }).compile();

        controller = module.get<CountryController>(CountryController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
