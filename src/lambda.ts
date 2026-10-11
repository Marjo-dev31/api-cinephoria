import serverlessExpress from '@codegenie/serverless-express';
import { createApp } from './main';

type LambdaHandler = (
    event: unknown,
    context: unknown,
    callback: unknown,
) => Promise<unknown>;

let server: LambdaHandler;

export const handler: LambdaHandler = async (event, context, callback) => {
    if (!server) {
        const app = await createApp();
        await app.init();
        server = serverlessExpress({ app: app.getHttpAdapter().getInstance() });
    }

    return server(event, context, callback);
};
