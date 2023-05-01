import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { UserInfoUpdateInterface } from '../interface/userinfo/userinfo-update.interface';
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

  userInfo$ = this.authenticationService.userInfo$.pipe(
    tap((response) => {
      this.formGroup.patchValue({
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        address: response.data.address,
        emailAddress: response.data.emailAddress,
        contactNumber: response.data.contactNumber,
      });
    })
  );

  update$ = this.authenticationService.updateUserInfo$;

  formGroup!: FormGroup;

  public initializeForms(): void {
    this.formGroup = this.formBuilder.group({
      id: [0],
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

  public saveUserInfo(): void {
    const userInfoToUpdate: UserInfoUpdateInterface[] = [
      {
        op: 'replace',
        path: '/firstname',
        value: this.formGroup.get('firstName')?.value,
      },
      {
        op: 'replace',
        path: '/lastname',
        value: this.formGroup.get('lastName')?.value,
      },
      {
        op: 'replace',
        path: '/address',
        value: this.formGroup.get('address')?.value,
      },
      {
        op: 'replace',
        path: '/emailaddress',
        value: this.formGroup.get('emailAddress')?.value,
      },
      {
        op: 'replace',
        path: '/contactnumber',
        value: this.formGroup.get('contactNumber')?.value,
      },
    ];

    this.authenticationService.userUpdate(
      this.formGroup.get('id')?.value,
      userInfoToUpdate
    );
  }

  ngOnInit(): void {
    this.initializeForms();
  }
}
