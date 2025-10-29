import { Module } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { IncidentController } from './incident.controller';
import { IncidentProviders } from './incident.provider';
import { DatabaseModule } from '../config/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [IncidentController],
    providers: [...IncidentProviders, IncidentService],
})
export class IncidentModule {}
