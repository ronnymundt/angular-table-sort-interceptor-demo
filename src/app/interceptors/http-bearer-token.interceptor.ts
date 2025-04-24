import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { demoBearerToken } from '../app.config';

export const httpBearerTokenInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const clonedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${demoBearerToken}`,
    },
  });
  return next(clonedRequest);
};
