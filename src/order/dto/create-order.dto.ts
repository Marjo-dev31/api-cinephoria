import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { Showing } from '../../showing/entities/showing.entity';
import { Seat } from '../../seat/entities/seat.entity';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({ example: 2, minimum: 1 })
    @IsNumber()
    quantity!: number;

    @ApiProperty({ example: 24.5, minimum: 0 })
    @IsNumber({ maxDecimalPlaces: 2 })
    total!: number;

    @ApiProperty({
        description: 'Séance réservée',
        type: 'object',
        additionalProperties: true,
    })
    @IsNotEmpty()
    showing!: Showing;

    @ApiProperty({
        description: 'Places réservées',
        type: 'array',
        items: { type: 'object' },
    })
    @IsArray()
    seat!: Seat[];

    @ApiProperty({
        description: 'Utilisateur qui passe la commande',
        type: 'object',
        additionalProperties: true,
    })
    @IsNotEmpty()
    user!: User;
}
