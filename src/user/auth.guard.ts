import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { fetchSecrets } from 'src/helpers/fetch-secrets';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Please provide token');
        }

        const secrets = await fetchSecrets('cinephoria');

        try {
            const payload = await this.jwtService.verifyAsync<
                Record<string, unknown>
            >(token, {
                secret: secrets.SECRET_TOKEN,
            });
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException('Invalid or expired token');
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const authorization = request.headers.authorization;
        if (!authorization || authorization.trim() === '') {
            return undefined;
        }

        const [type, token] = authorization.split(' ');
        return type === 'Bearer' && token ? token : undefined;
    }
}
