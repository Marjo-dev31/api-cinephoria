import { Module } from '@nestjs/common';
import { ShowingService } from './showing.service';
import { ShowingController } from './showing.controller';
import { DatabaseModule } from 'src/config/database.module';
import { showingProviders } from './showing.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [ShowingController],
    providers: [...showingProviders, ShowingService],
})
export class ShowingModule {}
