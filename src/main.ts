import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { CustomConfigModule } from './helpers/custom-config.module';

export async function createApp() {
    const app = await NestFactory.create(AppModule);
    const configService = app.select(CustomConfigModule).get(ConfigService);
    const PORT = configService.get<number>('PORT', 3000);
    const corsOrigins = process.env.CORS_ORIGINS?.split(',').filter(
        Boolean,
    ) ?? [
        'http://localhost:4200',
        'http://localhost:8100',
        'http://cinephoria-web.s3-website.eu-west-3.amazonaws.com',
        'https://dykoa3a9xthu7.cloudfront.net',
    ];

    app.use(
        helmet({
            crossOriginResourcePolicy: { policy: 'cross-origin' },
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    imgSrc: ["'self'", ...corsOrigins, 'data:', 'blob:'],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    scriptSrc: ["'self'"],
                },
            },
        }),
    );
    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
    app.enableCors({
        origin: corsOrigins,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
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

    app.use('/docs', (_req, res, next) => {
        res.removeHeader('Content-Security-Policy');
        next();
    });

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Cinéphoria API')
        .setDescription('Documentation de l’API Cinéphoria')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, swaggerDocument, {
        jsonDocumentUrl: 'docs-json',
    });

    return app;
}

async function bootstrap() {
    const app = await createApp();
    const configService = app.select(CustomConfigModule).get(ConfigService);
    const PORT = configService.get<number>('PORT', 3000);
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0', () => {
        console.log(
            `Running API in mode: ${configService.get('NODE_ENV')} on port: ${PORT}`,
            `mysql: ${configService.get('MYSQL_DB_HOST')}`,
        );
    });
}
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
    void bootstrap();
}
