import { Module } from '@nestjs/common';
import { PricelistService } from './pricelist.service';
import { DatabaseModule } from '../config/database.module';
import { priceProviders } from './pricelist.providers';
import { PricelistController } from './pricelist.controller';

@Module({
    imports: [DatabaseModule],
    providers: [...priceProviders, PricelistService],
    controllers: [PricelistController],
})
export class PricelistModule {}
