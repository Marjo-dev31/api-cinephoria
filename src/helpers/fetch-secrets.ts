/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { ConfigService } from '@nestjs/config';

const ISPRODUCTION = true;

export const fetchSecrets = async (secretName: string) => {
    if (ISPRODUCTION) {
        new ConfigService();
        const client = new SecretsManagerClient({
            region: 'eu-west-3',
        });
        try {
            const response = await client.send(
                new GetSecretValueCommand({
                    SecretId: secretName,
                    VersionStage: 'AWSCURRENT',
                }),
            );
            if (response.SecretString) {
                return JSON.parse(response.SecretString);
            } else {
                return undefined;
            }
        } catch (error) {
            console.log('catcherror');
            throw error;
        }
    } else {
        const response = {
            MYSQL_DB_DATABASE: process.env.MYSQL_DB_DATABASE,
            MYSQL_DB_HOST: process.env.MYSQL_DB_HOST,
            MYSQL_DB_PORT: process.env.MYSQL_DB_PORT,
            MYSQL_DB_USERNAME: process.env.MYSQL_DB_USERNAME,
            MYSQL_DB_PASSWORD: process.env.MYSQL_DB_PASSWORD,
            MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
            MONGO_URI: process.env.MONGO_URI,
            MONGO_DB: process.env.MONGO_DB,
            MONGO_PASSWORD: process.env.MONGO_PASSWORD,
            MONGO_USERNAME: process.env.MONGO_USERNAME,
            SECRET_TOKEN: process.env.SECRET_TOKEN,
            NODE_ENV: process.env.NODE_ENV,
            PORT: process.env.PORT,
        };
        return response;
    }
};
