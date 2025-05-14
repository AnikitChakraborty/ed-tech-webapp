import { JwtService } from '@nestjs/jwt';

export function generateAccessToken(
  userId: any,
  username: string,
  JwtService: JwtService,
): string {
  const payload = { sub: userId, username };
  return JwtService.sign(payload, { algorithm: 'HS256', expiresIn: '15m' });
}
