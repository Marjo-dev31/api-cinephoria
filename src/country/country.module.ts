import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { DatabaseModule } from '../config/database.module';
import { countryProviders } from './country.provider';

@Module({
    imports: [DatabaseModule],
    controllers: [CountryController],
    providers: [...countryProviders, CountryService],
})
export class CountryModule {}
