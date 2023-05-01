import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenRequestInterface } from './modules/shared/interface/auth/token-request.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStrorageService {
  constructor() {}

  private userNameSub$ = new BehaviorSubject<string | null>(null);
  public readonly userNameObs$ = this.userNameSub$.asObservable();

  private tokenSub$ = new BehaviorSubject<TokenRequestInterface>(
    {} as TokenRequestInterface
  );
  public readonly tokenObs$ = this.tokenSub$.asObservable();

  public getLocalStorageData(): void {
    const token: any = localStorage.getItem('token');
    const refreshToken: any = localStorage.getItem('refreshToken');
    const userName: any = localStorage.getItem('userName');

    if (token != null && refreshToken != null && userName != null) {
      const tokens: TokenRequestInterface = {
        Token: token,
        RefreshToken: refreshToken,
      };
      this.userNameSub$.next(userName);
      this.tokenSub$.next(tokens);
    }
  }

  // Action Functions

  public addToken(token: TokenRequestInterface): void {
    this.tokenSub$.next(token);
  }
}
