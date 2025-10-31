import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MOVIE_MONGO_REPOSITORY, MOVIE_REPOSITORY } from './constants';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('MoviesController', () => {
    let controller: MoviesController;
    let moviesService: MoviesService;
    const mockJwtService: Partial<JwtService> = {};
    const mockConfigService: Partial<ConfigService> = {
        get: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MoviesController],
            providers: [
                MoviesService,
                { provide: MOVIE_REPOSITORY, useValue: 'MOVIE_REPOSITORY' },
                {
                    provide: MOVIE_MONGO_REPOSITORY,
                    useValue: 'MOVIE_MONGO_REPOSITORY',
                },
                { provide: JwtService, useValue: mockJwtService as JwtService },
                {
                    provide: ConfigService,
                    useValue: mockConfigService as ConfigService,
                },
            ],
        }).compile();

        controller = module.get<MoviesController>(MoviesController);
        moviesService = module.get<MoviesService>(MoviesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('findAll', () => {
        it('should return an array of movies', async () => {
            const result = [
                {
                    id: '80db24b8-8066-4bd9-96ed-46e33d039d65',
                    title: "avatar: la voie de l'eau",
                    description:
                        "Se déroulant plus d’une décennie après les événements relatés dans le premier film, AVATAR : LA VOIE DE L’EAU raconte l'histoire des membres de la famille Sully (Jake, Neytiri et leurs enfants), les épreuves auxquelles ils sont confrontés, les chemins qu’ils doivent emprunter pour se protéger les uns les autres, les batailles qu’ils doivent mener pour rester en vie et les tragédies qu'ils endurent.",
                    image_Url: 'avatar.jpg',
                    minimum_Age: 3,
                    is_Favorite: true,
                    create_At: new Date('2025-10-03T15:27:44.121Z'),
                    genre: {
                        id: '856eed4e-246b-4199-a469-6f0572651296',
                        title: 'science-fiction',
                        movie: [],
                    },
                    reviews: [],
                    showing: [],
                },
            ];
            jest.spyOn(moviesService, 'findAll').mockResolvedValue(result);
            expect(await controller.findAll()).toBe(result);
        });
    });
});
