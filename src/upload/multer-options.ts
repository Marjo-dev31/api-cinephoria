/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { BadRequestException } from '@nestjs/common';
import { memoryStorage } from 'multer';

export const multerOptions = {
    // Keep the file in memory: Lambda's filesystem is read-only, so the
    // upload is streamed to S3 from the in-memory buffer instead of disk.
    storage: memoryStorage(),
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
