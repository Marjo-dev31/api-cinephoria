import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { fetchSecrets } from 'src/helpers/fetch-secrets';

jest.mock('src/helpers/fetch-secrets');

const mockedFetchSecrets = fetchSecrets as jest.MockedFunction<
    typeof fetchSecrets
>;

describe('AuthGuard', () => {
    let guard: AuthGuard;
    let jwtService: { verifyAsync: jest.Mock };
    let configService: ConfigService;

    const buildContext = (headers: Record<string, unknown>) => {
        const request: { headers: Record<string, unknown>; user?: unknown } = {
            headers,
        };
        return {
            request,
            context: {
                switchToHttp: () => ({
                    getRequest: () => request,
                }),
            } as unknown as ExecutionContext,
        };
    };

    beforeEach(() => {
        jwtService = { verifyAsync: jest.fn() };
        configService = {} as ConfigService;
        guard = new AuthGuard(
            jwtService as unknown as JwtService,
            configService,
        );

        mockedFetchSecrets.mockResolvedValue({
            SECRET_TOKEN: 'test-secret',
        } as Awaited<ReturnType<typeof fetchSecrets>>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(guard).toBeDefined();
    });

    it('allows the request and attaches the payload when the token is valid', async () => {
        const payload = { sub: '123', email: 'user@test.com' };
        jwtService.verifyAsync.mockResolvedValue(payload);
        const { context, request } = buildContext({
            authorization: 'Bearer valid-token',
        });

        await expect(guard.canActivate(context)).resolves.toBe(true);

        expect(jwtService.verifyAsync).toHaveBeenCalledWith('valid-token', {
            secret: 'test-secret',
        });
        expect(request.user).toEqual(payload);
    });

    it('throws UnauthorizedException when the authorization header is missing', async () => {
        const { context } = buildContext({});

        await expect(guard.canActivate(context)).rejects.toThrow(
            UnauthorizedException,
        );
        expect(jwtService.verifyAsync).not.toHaveBeenCalled();
    });

    it('throws UnauthorizedException when the authorization header is empty', async () => {
        const { context } = buildContext({ authorization: '   ' });

        await expect(guard.canActivate(context)).rejects.toThrow(
            UnauthorizedException,
        );
        expect(jwtService.verifyAsync).not.toHaveBeenCalled();
    });

    it('throws UnauthorizedException when the scheme is not Bearer', async () => {
        const { context } = buildContext({ authorization: 'Basic abc123' });

        await expect(guard.canActivate(context)).rejects.toThrow(
            UnauthorizedException,
        );
        expect(jwtService.verifyAsync).not.toHaveBeenCalled();
    });

    it('throws UnauthorizedException when the token part is missing', async () => {
        const { context } = buildContext({ authorization: 'Bearer' });

        await expect(guard.canActivate(context)).rejects.toThrow(
            UnauthorizedException,
        );
        expect(jwtService.verifyAsync).not.toHaveBeenCalled();
    });

    it('throws UnauthorizedException when the token is invalid or expired', async () => {
        jwtService.verifyAsync.mockRejectedValue(new Error('jwt expired'));
        const { context } = buildContext({
            authorization: 'Bearer invalid-token',
        });

        await expect(guard.canActivate(context)).rejects.toThrow(
            UnauthorizedException,
        );
        expect(jwtService.verifyAsync).toHaveBeenCalled();
    });
});
