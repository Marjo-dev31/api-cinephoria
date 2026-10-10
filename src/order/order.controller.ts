import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '../user/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiCreationErrorResponses } from '../helpers/swagger-error-responses';

@ApiTags('Commandes')
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    @ApiCreationErrorResponses({ authenticated: true })
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get()
    findAll() {
        return this.orderService.findAll();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get(':id')
    findByUser(@Param('id') id: string) {
        return this.orderService.findByUser(id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.orderService.update(id, updateOrderDto);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orderService.remove(id);
    }
}
