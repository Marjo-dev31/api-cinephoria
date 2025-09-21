import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { ROLE_REPOSITORY } from './constants';

describe('RoleController', () => {
    let controller: RoleController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RoleController],
            providers: [
                RoleService,
                {
                    provide: ROLE_REPOSITORY,
                    useValue: 'ROLE_REPOSITORY',
                },
            ],
        }).compile();

        controller = module.get<RoleController>(RoleController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
