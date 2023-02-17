import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject, switchMap, tap } from 'rxjs';
import { ServiceResponse } from '../interface/service-response.interface';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  private loginSub$ = new Subject<FormControl>();
  public loginObs$ = this.loginSub$.asObservable();

  private userInfoIdSub$ = new BehaviorSubject<number>(0);
  public userInfoIdObs$ = this.userInfoIdSub$.asObservable();

  public login$ = this.loginObs$.pipe(
    switchMap((creds) =>
      this.httpClient.post<ServiceResponse>(
        this.apiUrl + '/api/auth/login',
        JSON.stringify(creds)
      )
    )
  );

  public userInfo$ = this.userInfoIdObs$.pipe(
    switchMap((userId) => {
      return this.httpClient.get<ServiceResponse>(
        this.apiUrl + '/api/auth/user/' + userId
      );
    })
  );

  // Action Functions

  public userLogin(creds: FormControl) {
    this.loginSub$.next(creds);
  }

  public userInfoId(userId: number): void {
    this.userInfoIdSub$.next(userId);
  }
}
