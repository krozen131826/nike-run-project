import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { LocalStrorageService } from './local-strorage.service';
import { AuthenticationService } from './modules/shared/service/authentication.service';
import { TokenRequestInterface } from './modules/shared/interface/auth/token-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    private localStorageService: LocalStrorageService,
    private authService: AuthenticationService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.localStorageService.tokenObs$.pipe(
      switchMap((token) => {
        let refreshTokenRequest: TokenRequestInterface = {
          Token: token.Token,
          RefreshToken: token.RefreshToken,
        };
        if (token != null) {
          const cloned = request.clone({
            setHeaders: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.Token}`,
            },
          });

          return next.handle(cloned).pipe(
            catchError((err) => {
              if (err.status === 401) {
                this.authService.tokenVerify(refreshTokenRequest);
                this.authService.tokenRequest$.subscribe((token) => {
                  localStorage.setItem('token', token.data.Token);
                  localStorage.setItem('refreshToken', token.data.RefreshToken);

                  const cloned = request.clone({
                    setHeaders: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token.data.Token}`,
                    },
                  });
                  return next.handle(cloned);
                });
              }
              throw err;
            })
          );
        } else {
          const cloned = request.clone({
            setHeaders: {
              'Content-Type': 'application/json',
            },
          });
          return next.handle(cloned);
        }
      })
    );

    // if (this.token != null) {
    //   const cloned = request.clone({
    //     setHeaders: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${this.token}`,
    //     },
    //   });
    //   return next.handle(cloned).pipe(
    //     catchError((err) => {
    //       if (err.status === 401) {
    //         console.log('expires');
    //         this.authService.tokenVerify(refreshTokenRequest);
    //         this.authService.tokenRequest$.subscribe((token) => {
    //           console.log(token);
    //           const cloned = request.clone({
    //             setHeaders: {
    //               'Content-Type': 'application/json',
    //               Authorization: `Bearer ${token.data.Token}`,
    //             },
    //           });
    //           return next.handle(cloned);
    //         });
    //       }
    //       throw err;
    //     })
    //   );
    // } else {
    //   const cloned = request.clone({
    //     setHeaders: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    //   return next.handle(cloned);
    // }
  }
}
