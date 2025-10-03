import {
    Controller,
    FileTypeValidator,
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

@Controller('upload')
export class UploadController {
    // @Get('/:id')
    // getFile(@Param('id') id: string, @Res() res) {
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    //     res.sendFile(id, { root: './uploads' });
    // }

    @UseGuards(AuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file', multerOptions))
    uploadFile(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 5_000_000,
                        message: 'Le fichier est trop volumineux (max 5 MB)',
                    }),
                    new FileTypeValidator({
                        fileType: /^image\/(png|jpeg|jpg|webp)$/,
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
    ) {
        return {
            message: 'Fichier uploadé avec succès',
            filename: file.originalname,
            size: file.size,
        };
    }
}
