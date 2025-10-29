import { Test, TestingModule } from '@nestjs/testing';
import { IncidentService } from './incident.service';
import { INCIDENT_REPOSITORY } from './constants';

describe('IncidentService', () => {
    let service: IncidentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IncidentService,
                {
                    provide: INCIDENT_REPOSITORY,
                    useValue: 'INCIDENT_REPOSITORY',
                },
            ],
        }).compile();

        service = module.get<IncidentService>(IncidentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
