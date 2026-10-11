// In this training deployment, Terraform injects secrets as Lambda environment
// variables. Local development keeps using the .env file.
type Secrets = {
    MYSQL_DB_DATABASE: string;
    MYSQL_DB_HOST: string;
    MYSQL_DB_PORT: string;
    MYSQL_DB_USERNAME: string;
    MYSQL_DB_PASSWORD: string;
    MYSQL_ROOT_PASSWORD: string;
    SECRET_TOKEN: string;
    NODE_ENV: string;
    PORT: string;
} & Record<string, string>;

export const fetchSecrets = async (_secretName: string): Promise<Secrets> => {
    const response = {
        MYSQL_DB_DATABASE: process.env.MYSQL_DB_DATABASE,
        MYSQL_DB_HOST: process.env.MYSQL_DB_HOST,
        MYSQL_DB_PORT: process.env.MYSQL_DB_PORT,
        MYSQL_DB_USERNAME: process.env.MYSQL_DB_USERNAME,
        MYSQL_DB_PASSWORD: process.env.MYSQL_DB_PASSWORD,
        MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
        SECRET_TOKEN: process.env.SECRET_TOKEN,
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
    };
    return response as Secrets;
};
