import { Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { DatabaseModule } from 'src/config/database.module';
import { seatProviders } from './seat.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [SeatController],
    providers: [...seatProviders, SeatService],
})
export class SeatModule {}
