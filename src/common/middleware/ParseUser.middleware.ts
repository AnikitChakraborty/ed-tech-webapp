import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ParseUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const cookie = req.headers.cookie;

    console.log('we are in parseUsaeMiddlewere');

    if (cookie) {
      try {
        const tokens = Object.fromEntries(
          cookie.split('; ').map((c) => {
            const [key, value] = c.split('=');
            return [key, value];
          }),
        );
        const accessToken = tokens.accessToken;

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        console.log('decoded-->', decoded);

        req['user'] = decoded;
      } catch (err) {
        // Token invalid or expired — do not attach anything to req.user
        req['user'] = null;
      }
    }
    next();
  }
}
