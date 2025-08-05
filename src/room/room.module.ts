import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { DatabaseModule } from 'src/config/database.module';
import { roomProviders } from './room.providers';
import { RoomService } from './room.service';

@Module({
    imports: [DatabaseModule],
    controllers: [RoomController],
    providers: [...roomProviders, RoomService],
})
export class RoomModule {}
