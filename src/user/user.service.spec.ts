import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { USER_REPOSITORY } from './constants';
import { JwtService } from '@nestjs/jwt';

describe('UserService', () => {
    let service: UserService;
    const mockJwtService: Partial<JwtService> = {};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: JwtService, useValue: mockJwtService as JwtService },
                { provide: USER_REPOSITORY, useValue: 'USER_REPOSITORY' },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
