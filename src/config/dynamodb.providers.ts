import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export const DYNAMODB_DOCUMENT_CLIENT = 'DYNAMODB_DOCUMENT_CLIENT';

export const dynamoDbProviders = [
    {
        provide: DYNAMODB_DOCUMENT_CLIENT,
        useFactory: () =>
            DynamoDBDocumentClient.from(
                new DynamoDBClient({
                    region: process.env.AWS_REGION ?? 'eu-west-3',
                }),
            ),
    },
];
