/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { fetchSecrets } from './fetch-secrets';

export default async () => {
    const secrets = await fetchSecrets('prod-jodb');
    return {
        port: +secrets.PORT,
        databaseMySql: {
            host: secrets.MYSQL_DB_HOST,
            port: +secrets.MYSQL_DB_PORT,
            name: secrets.MYSQL_DB_DATABASE,
            password: secrets.MYSQL_DB_PASSWORD,
            user: secrets.MYSQL_DB_USERNAME,
        },
        mongo: {
            uri: secrets.MONGO_URI,
            name: secrets.MONGO_DB,
            password: secrets.MONGO_PASSWORD,
            username: secrets.MONGO_USERNAME,
        },
        secret_token: secrets.SECRET_TOKEN,
    };
};
