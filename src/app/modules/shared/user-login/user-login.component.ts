import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { HelperService } from '../service/helper.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLoginComponent implements OnInit {
  constructor(
    private helperService: HelperService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}

  formGroup!: FormGroup;

  login$ = this.authenticationService.login$.pipe(
    tap((response) => {
      if (response.success == true) {
        localStorage.setItem('user', JSON.stringify(response.data));
        this.helperService.loginModalToggle(false);
        location.reload();
      }
    })
  );

  public initializeForms(): void {
    this.formGroup = this.formBuilder.group({
      emailAddress: [
        '',
        Validators.compose([Validators.email, Validators.required]),
      ],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  public closeLoginModal(): void {
    this.helperService.loginModalToggle(false);
  }

  public registerModal(): void {
    this.helperService.loginModalToggle(false);
    this.helperService.registerModal(true);
  }

  public loginUser(): void {
    this.authenticationService.userLogin(this.formGroup.value);
  }

  ngOnInit(): void {
    this.initializeForms();
  }
}
