/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';

export const multerOptions = {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            const filename = file.originalname;
            cb(null, filename);
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp',
        ];

        if (!allowedMimes.includes(file.mimetype)) {
            return cb(
                new BadRequestException(
                    `Type de fichier non autorisé (${file.mimetype}). Types acceptés : PNG, JPEG, JPG, WEBP`,
                ),
                false,
            );
        }
        cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
};
