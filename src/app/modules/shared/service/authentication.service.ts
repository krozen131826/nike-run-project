import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject, switchMap, tap } from 'rxjs';
import { ServiceResponseInterface } from '../interface/service-response/service-response.interface';
import { FormControl } from '@angular/forms';
import { UserDetailsInterface } from '../interface/userinfo/user-details.interface';
import { LoginResponseInterface } from '../interface/auth/login-response.interface';
import { RegisterResponseInterface } from '../interface/auth/register-response.interface';
import { UserInfoUpdateInterface } from '../interface/userinfo/userinfo-update.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  // Subjects and BehaviorSubject
  private loginSub$ = new Subject<FormControl>();
  public loginObs$ = this.loginSub$.asObservable();

  private userInfoIdSub$ = new BehaviorSubject<number>(0);
  public userInfoIdObs$ = this.userInfoIdSub$.asObservable();

  private registerUserSub$ = new Subject<FormControl>();
  public registerUserObs$ = this.registerUserSub$.asObservable();

  private userInfoUpdateSub$ = new Subject<{
    id: number;
    userInfo: UserInfoUpdateInterface[];
  }>();
  public userInfoUpdateObs$ = this.userInfoUpdateSub$.asObservable();

  // API Calls
  public login$ = this.loginObs$.pipe(
    switchMap((creds) =>
      this.httpClient.post<ServiceResponseInterface<LoginResponseInterface>>(
        this.apiUrl + '/api/auth/login',
        JSON.stringify(creds)
      )
    )
  );

  public register$ = this.registerUserObs$.pipe(
    switchMap((creds) =>
      this.httpClient.post<ServiceResponseInterface<RegisterResponseInterface>>(
        this.apiUrl + '/api/auth/register',
        JSON.stringify(creds)
      )
    )
  );

  public userInfo$ = this.userInfoIdObs$.pipe(
    switchMap((userId) => {
      return this.httpClient.get<
        ServiceResponseInterface<UserDetailsInterface>
      >(this.apiUrl + '/api/auth/user/' + userId);
    })
  );

  public updateUserInfo$ = this.userInfoUpdateObs$.pipe(
    switchMap((user) => {
      return this.httpClient.patch<
        ServiceResponseInterface<UserDetailsInterface>
      >(
        this.apiUrl + '/api/userinfo/update/' + user.id,
        JSON.stringify(user.userInfo)
      );
    })
  );

  // Action Functions

  public userLogin(creds: FormControl) {
    this.loginSub$.next(creds);
  }

  public userRegister(creds: FormControl) {
    this.registerUserSub$.next(creds);
  }

  public userInfoId(userId: number): void {
    this.userInfoIdSub$.next(userId);
  }

  public userUpdate(userId: number, userInfo: UserInfoUpdateInterface[]): void {
    let forUpdate = { id: userId, userInfo: userInfo };
    this.userInfoUpdateSub$.next(forUpdate);
  }
}
