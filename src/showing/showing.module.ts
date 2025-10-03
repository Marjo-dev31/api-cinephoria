import { Module } from '@nestjs/common';
import { ShowingService } from './showing.service';
import { ShowingController } from './showing.controller';
import { DatabaseModule } from '../config/database.module';
import { showingProviders } from './showing.providers';
import { UserModule } from '../user/user.module';

@Module({
    imports: [DatabaseModule, UserModule],
    controllers: [ShowingController],
    providers: [...showingProviders, ShowingService],
})
export class ShowingModule {}
