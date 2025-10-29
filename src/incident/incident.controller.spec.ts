import { Test, TestingModule } from '@nestjs/testing';
import { IncidentController } from './incident.controller';
import { IncidentService } from './incident.service';
import { INCIDENT_REPOSITORY } from './constants';

describe('IncidentController', () => {
    let controller: IncidentController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [IncidentController],
            providers: [
                IncidentService,
                {
                    provide: INCIDENT_REPOSITORY,
                    useValue: 'INCIDENT_REPOSITORY',
                },
            ],
        }).compile();

        controller = module.get<IncidentController>(IncidentController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
