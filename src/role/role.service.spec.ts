import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { ROLE_REPOSITORY } from './constants';

describe('RoleService', () => {
    let service: RoleService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RoleService,
                {
                    provide: ROLE_REPOSITORY,
                    useValue: 'ROLE_REPOSITORY',
                },
            ],
        }).compile();

        service = module.get<RoleService>(RoleService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
