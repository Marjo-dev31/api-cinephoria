/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
//import { fetchSecrets } from 'src/helpers/fetch-secrets';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const { authorization } = request.headers;
            if (!authorization || authorization.trim() === '') {
                throw new UnauthorizedException('Please provide token');
            }

            const authToken: string = authorization.split(' ')[1];
            //const secrets = await fetchSecrets('prod-jodb');
            const payload = await this.jwtService.verifyAsync(authToken, {
                secret: this.configService.getOrThrow('SECRET_TOKEN'),
            });
            request['user'] = payload;
        } catch (error) {
            throw new ForbiddenException(error.message);
        }
        return true;
    }
}
