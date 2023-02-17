import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

import { HelperService } from '../service/helper.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent implements OnInit {
  private user: any = localStorage.getItem('user');
  private userDetails = JSON.parse(this.user);

  constructor(private helperService: HelperService) {}

  loginModal$ = this.helperService.loginModalObs$;
  userName$ = this.helperService.userNameObs$;
  userInfoModal$ = this.helperService.userInfoModalObs$;

  public toggleLogin() {
    this.helperService.loginModalToggle(true);
  }

  private setUserInfo(): void {
    if (this.userDetails != null) {
      this.helperService.userName(this.userDetails.fullName);
    }
  }

  public userInfoModal(): void {
    this.helperService.userInfoModal(true);
  }

  ngOnInit(): void {
    this.setUserInfo();
  }
}
