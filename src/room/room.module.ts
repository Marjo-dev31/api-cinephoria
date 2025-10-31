import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { DatabaseModule } from '../config/database.module';
import { roomProviders } from './room.providers';
import { RoomService } from './room.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [DatabaseModule, UserModule],
    controllers: [RoomController],
    providers: [...roomProviders, RoomService],
})
export class RoomModule {}
