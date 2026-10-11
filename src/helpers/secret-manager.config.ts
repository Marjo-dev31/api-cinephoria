/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { fetchSecrets } from './fetch-secrets';

export default async () => {
    const secrets = await fetchSecrets('cinephoria');
    return {
        port: +secrets.PORT,
        databaseMySql: {
            host: secrets.MYSQL_DB_HOST,
            port: +secrets.MYSQL_DB_PORT,
            name: secrets.MYSQL_DB_DATABASE,
            password: secrets.MYSQL_DB_PASSWORD,
            user: secrets.MYSQL_DB_USERNAME,
        },
        secret_token: secrets.SECRET_TOKEN,
    };
};
