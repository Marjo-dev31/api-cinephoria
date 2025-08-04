import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from './country.service';
import { COUNTRY_REPOSITORY } from './constants';

describe('CountryService', () => {
    let service: CountryService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CountryService,
                { provide: COUNTRY_REPOSITORY, useValue: 'COUNTRY_REPOSITORY' },
            ],
        }).compile();

        service = module.get<CountryService>(CountryService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
