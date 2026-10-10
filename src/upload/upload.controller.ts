import {
    Controller,
    MaxFileSizeValidator,
    ParseFilePipe,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multer-options';
import { AuthGuard } from '../user/auth.guard';
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

@ApiTags('Fichiers')
@Controller('upload')
export class UploadController {
    // @Get('/:id')
    // getFile(@Param('id') id: string, @Res() res) {
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    //     res.sendFile(id, { root: './uploads' });
    // }

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
    uploadFile(
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
        return {
            message: 'Fichier uploadé avec succès',
            filename: file.originalname,
            path: `/uploads/${file.filename}`,
            size: file.size,
        };
    }
}
