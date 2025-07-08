import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller('upload')
export class UploadController {
    @Get('/:id')
    getFile(@Param('id') id: string, @Res() res) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        res.sendFile(id, { root: './uploads' });
    }
}
