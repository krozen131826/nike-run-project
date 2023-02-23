import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { HelperService } from '../service/helper.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private helperService: HelperService,
    private authenticationService: AuthenticationService
  ) {}

  private user: any = localStorage.getItem('user');
  private userDetails = JSON.parse(this.user);

  userInfo$ = this.authenticationService.userInfo$.pipe(
    tap((response) => {
      this.formGroup.patchValue({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        address: response.data.address,
        emailAddress: response.data.emailAddress,
        contactNumber: response.data.contactNumber,
      });
    })
  );

  formGroup!: FormGroup;

  public initializeForms(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      emailAddress: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      contactNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
    });
  }

  public closeUserInforModal(): void {
    this.helperService.userInfoModal(false);
  }

  public logout(): void {
    location.reload();
    localStorage.clear();
  }

  ngOnInit(): void {
    this.initializeForms();
    this.authenticationService.userInfoId(this.userDetails.id);
  }
}
