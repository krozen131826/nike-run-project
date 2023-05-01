import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { LocalStrorageService } from 'src/app/local-strorage.service';
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

  constructor(
    private helperService: HelperService,
    private localStorageService: LocalStrorageService
  ) {}

  loginModal$ = this.helperService.loginModalObs$;
  userInfoModal$ = this.helperService.userInfoModalObs$;
  cartModal$ = this.helperService.cartModalObs$;
  userName$ = this.localStorageService.userNameObs$;
  registerModal$ = this.helperService.registerModalObs$;

  public toggleLogin() {
    this.helperService.loginModalToggle(true);
  }

  public userInfoModal(): void {
    this.helperService.userInfoModal(true);
  }

  public cartModal(): void {
    this.helperService.cartModal(true);
  }

  public registerModal(): void {
    this.helperService.registerModal(true);
  }

  ngOnInit(): void {}
}
