import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('/api')) {
      const modifiedReq = request.clone({
        url: Environment.apiUrl + request.url.substring('/api'.length),
        headers: request.headers.set(
          'x-session-token',
          localStorage.getItem('session-token') || 'null'
        ),
      });
      return next.handle(modifiedReq);
    }
    return next.handle(request);
  }
}
