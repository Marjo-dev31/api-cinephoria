import { Injectable, Inject } from '@nestjs/common';
import { PRICE_REPOSITORY } from './constants';
import { Repository } from 'typeorm';
import { Price } from './entities/price.entity';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Injectable()
export class PricelistService {
    constructor(
        @Inject(PRICE_REPOSITORY)
        private readonly priceRepository: Repository<Price>,
    ) {}

    async create(createPriceDto: CreatePriceDto) {
        const newPrice = this.priceRepository.create(createPriceDto);
        return await this.priceRepository.save(newPrice);
    }

    async findAll() {
        return await this.priceRepository.find();
    }

    async update(id: string, updatePriceDto: UpdatePriceDto) {
        return await this.priceRepository.update(
            { id },
            {
                price: updatePriceDto.price,
            },
        );
    }

    async remove(id: string) {
        return await this.priceRepository.delete({ id });
    }
}
