import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {
    Controller,
    Inject,
    InternalServerErrorException,
    MaxFileSizeValidator,
    ParseFilePipe,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiInternalServerErrorResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { S3_CLIENT } from '../config/s3.providers';
import { AuthGuard } from '../user/auth.guard';
import { multerOptions } from './multer-options';

@ApiTags('Fichiers')
@Controller('upload')
export class UploadController {
    constructor(
        @Inject(S3_CLIENT)
        private readonly s3Client: S3Client,
    ) {}

    @ApiOperation({ summary: 'Téléverser une image' })
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            required: ['file'],
            properties: {
                file: { type: 'string', format: 'binary' },
            },
        },
    })
    @UseGuards(AuthGuard)
    @Post()
    @ApiBadRequestResponse({
        description:
            'Aucun fichier valide n’a été envoyé ou son format est refusé.',
    })
    @ApiUnauthorizedResponse({
        description: "Le jeton d'authentification est absent ou invalide.",
    })
    @ApiInternalServerErrorResponse({
        description: "Le fichier n'a pas pu être enregistré.",
    })
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async uploadFile(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 5_000_000,
                        message: 'Le fichier est trop volumineux (max 5 MB)',
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
    ) {
        const bucket = process.env.S3_BUCKET_NAME;
        if (!bucket) {
            throw new InternalServerErrorException(
                'Le stockage des fichiers n’est pas configuré (S3_BUCKET_NAME manquant).',
            );
        }
        const key = file.originalname;

        try {
            await this.s3Client.send(
                new PutObjectCommand({
                    Bucket: bucket,
                    Key: key,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                }),
            );
        } catch {
            throw new InternalServerErrorException(
                "Le fichier n'a pas pu être enregistré.",
            );
        }

        const region =
            process.env.S3_REGION ?? process.env.AWS_REGION ?? 'eu-west-3';
        const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

        return {
            message: 'Fichier uploadé avec succès',
            filename: file.originalname,
            path: url,
            size: file.size,
        };
    }
}
