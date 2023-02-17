import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  // Subjects Section
  private loginModalSub$ = new BehaviorSubject<boolean>(false);
  public loginModalObs$ = this.loginModalSub$.asObservable();

  private userNameSub$ = new BehaviorSubject<string>('');
  public userNameObs$ = this.userNameSub$.asObservable();

  private userInfoModalSub$ = new BehaviorSubject<boolean>(false);
  public userInfoModalObs$ = this.userInfoModalSub$.asObservable();

  // Functions Section
  public loginModalToggle(bool: boolean): void {
    this.loginModalSub$.next(bool);
  }

  public userName(fullName: string): void {
    this.userNameSub$.next(fullName);
  }

  public userInfoModal(bool: boolean): void {
    this.userInfoModalSub$.next(bool);
  }
}
