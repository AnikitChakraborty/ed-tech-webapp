import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const cookie = req.headers.cookie;

    // console.log(req);

    //console.log(cookie);

    if (!cookie) {
      return {
        success: false,
        message: 'No cookies found. Please log in.',
      };
    }

    // Parse cookies
    const cookies = Object.fromEntries(
      cookie.split('; ').map((c) => {
        const [key, value] = c.split('=');
        return [key, value];
      }),
    );

    const accessToken = cookies.accessToken;
    // console.log('accessToken-->', accessToken);
    const refreshToken = cookies.refreshToken;
    // console.log('refreshToken-->', refreshToken);

    if (!accessToken) {
      throw new UnauthorizedException({
        success: false,
        message: 'Access token is missing. Please log in.',
      });
    }

    try {
      const decode = jwt.decode(accessToken);
      console.log('decode--->', decode);

      (req as any).userInfo = decode;

      next();
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
