/* eslint-disable @typescript-eslint/no-unsafe-argument */
// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import request from 'supertest';
// import { MoviesModule } from '../src/movies/movies.module';
// import { AuthGuard } from '../src/user/auth.guard';
// import { MoviesService } from '../src/movies/movies.service';
// import { UserModule } from '../src/user/user.module';
// import { ConfigService } from '@nestjs/config';

// describe('MoviesController (e2e)', () => {
//     let app: INestApplication;
//     const moviesService = { findAll: () => [] };

//     beforeAll(async () => {
//         const moduleFixture: TestingModule = await Test.createTestingModule({
//             imports: [MoviesModule, UserModule],
//         })
//             .overrideProvider(ConfigService)
//             .useValue({
//                 getOrThrow: (key: string) => {
//                     const config = {
//                         MONGO_URI: 'mongodb://localhost:27017/testdb',
//                         MONGO_DB: 'testdb',
//                         SECRET_TOKEN: 'testsecret',
//                     };
//                     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//                     return config[key];
//                 },
//             })
//             .overrideGuard(AuthGuard)
//             .useValue({ canActivate: () => true })
//             .overrideProvider(MoviesService)
//             .useValue(moviesService)
//             .compile();

//         app = moduleFixture.createNestApplication();
//         await app.init();
//     });

// afterAll(async () => {
//     await app.close();
// });

// it('GET /movies → should return list of movies', async () => {
//     return await request(app.getHttpServer())
//         .get('/movies')
//         .expect(200)
//         .expect({ data: moviesService.findAll() });
// });

// it('POST /movies → should create a movie', async () => {
//     const newMovie = { title: 'Inception', minimum_Age: 12 };

//     const response = await request(app.getHttpServer())
//         .post('/movies')
//         .send(newMovie)
//         .expect(201);

//     expect(response.body).toHaveProperty('title', 'Inception');
// });
// });
