import { S3Client } from '@aws-sdk/client-s3';

export const S3_CLIENT = 'S3_CLIENT';

export const s3Providers = [
    {
        provide: S3_CLIENT,
        useFactory: () =>
            new S3Client({
                region:
                    process.env.S3_REGION ??
                    process.env.AWS_REGION ??
                    'eu-west-3',
            }),
    },
];
