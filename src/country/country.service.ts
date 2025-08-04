import { Inject, Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { COUNTRY_REPOSITORY } from './constants';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';

@Injectable()
export class CountryService {
    constructor(
        @Inject(COUNTRY_REPOSITORY)
        private countryRepository: Repository<Country>,
    ) {}

    async create(createCountryDto: CreateCountryDto) {
        const newCountry = this.countryRepository.create(createCountryDto);
        return await this.countryRepository.save(newCountry);
    }

    async findAll() {
        return await this.countryRepository.find();
    }

    // findOne(id: string) {
    //     return `This action returns a #${id} country`;
    // }

    async update(id: string, updateCountryDto: UpdateCountryDto) {
        return await this.countryRepository.update(
            {
                id,
            },
            { name: updateCountryDto.name },
        );
    }

    async remove(id: string) {
        return await this.countryRepository.delete({ id });
    }
}
