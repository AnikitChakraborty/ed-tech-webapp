import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SetCookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((body) => {
        // Assuming `data` contains tokens
        if (body.accessToken && body.refreshToken) {
          response.cookie('accessToken', body.accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
          }); // 15 mins
          response.cookie('refreshToken', body.refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
          }); // 7 days
        }

        return body;
      }),
    );
  }
}
