import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiCreationErrorResponses } from '../helpers/swagger-error-responses';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { PricelistService } from './pricelist.service';

@ApiTags('Tarifs')
@Controller('pricelist')
export class PricelistController {
    constructor(private readonly pricelistService: PricelistService) {}

    @Post()
    @ApiCreationErrorResponses()
    create(@Body() createPriceDto: CreatePriceDto) {
        return this.pricelistService.create(createPriceDto);
    }

    @Get()
    findAll() {
        return this.pricelistService.findAll();
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePriceDto: UpdatePriceDto) {
        return this.pricelistService.update(id, updatePriceDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.pricelistService.remove(id);
    }
}
