import { applyDecorators } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

/** Documente les erreurs communes aux endpoints de création. */
export function ApiCreationErrorResponses(options?: {
    authenticated?: boolean;
    persistenceError?: boolean;
}) {
    const authenticated = options?.authenticated ?? false;
    const persistenceError = options?.persistenceError ?? true;

    return applyDecorators(
        ApiBadRequestResponse({
            description:
                'Les données envoyées ne respectent pas le format attendu.',
            schema: {
                example: {
                    statusCode: 400,
                    message: ['champ obligatoire ou invalide'],
                    error: 'Bad Request',
                },
            },
        }),
        ...(authenticated
            ? [
                  ApiUnauthorizedResponse({
                      description:
                          "Le jeton d'authentification est absent ou invalide.",
                      schema: {
                          example: {
                              statusCode: 401,
                              message: 'Unauthorized',
                          },
                      },
                  }),
              ]
            : []),
        ...(persistenceError
            ? [
                  ApiInternalServerErrorResponse({
                      description:
                          "L'enregistrement de la ressource en base de données a échoué.",
                      schema: {
                          example: {
                              statusCode: 500,
                              message: 'Internal server error',
                          },
                      },
                  }),
              ]
            : []),
    );
}
