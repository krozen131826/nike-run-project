import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const user: any = localStorage.getItem('user');
    const userDetail = JSON.parse(user);

    if (userDetail != null) {
      const cloned = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userDetail.token}`,
        },
      });
      return next.handle(cloned);
    } else {
      const cloned = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        },
      });
      return next.handle(cloned);
    }
  }
}
