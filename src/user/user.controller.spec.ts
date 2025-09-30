import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { USER_REPOSITORY } from './constants';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
    let controller: UserController;
    const mockJwtService: Partial<JwtService> = {};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                UserService,
                { provide: USER_REPOSITORY, useValue: 'USER_REPOSITORY' },
                { provide: JwtService, useValue: mockJwtService as JwtService },
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
