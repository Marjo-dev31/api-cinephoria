import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const PORT = configService.get<number>('PORT', 3000);

    app.use(
        helmet({
            crossOriginResourcePolicy: { policy: 'cross-origin' },
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    imgSrc: [
                        "'self'",
                        'http://localhost:4200',
                        'http://localhost:3000',
                        'http://localhost:8100',
                        'http://cinephoria-web.s3-website.eu-west-3.amazonaws.com',
                        'dykoa3a9xthu7.cloudfront.net',
                        'data:',
                        'blob:',
                    ],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    scriptSrc: ["'self'"],
                },
            },
        }),
    );
    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
    app.enableCors({
        origin: [
            'http://localhost:4200',
            'http://localhost:8100',
            'http://cinephoria-web.s3-website.eu-west-3.amazonaws.com',
            'dykoa3a9xthu7.cloudfront.net',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    await app.listen(PORT, () => {
        console.log(
            `Running API in mode: ${configService.get('NODE_ENV')} on port: ${PORT}`,
            `mysql: ${configService.get('MYSQL_DB_HOST')}`,
        );
    });
}
void bootstrap();
