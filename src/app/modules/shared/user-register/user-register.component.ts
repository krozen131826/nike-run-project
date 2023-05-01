import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { HelperService } from '../service/helper.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  constructor(
    private helperService: HelperService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}

  formGroup!: FormGroup;

  register$ = this.authenticationService.register$.pipe(
    tap((res) => {
      if (res.success) {
        this.formGroup.reset();
        this.helperService.registerModal(false);
        this.helperService.loginModalToggle(true);
      }
    })
  );

  public initializeForms(): void {
    this.formGroup = this.formBuilder.group(
      {
        firstName: ['', Validators.compose([Validators.required])],
        lastName: ['', Validators.compose([Validators.required])],
        address: ['', Validators.compose([Validators.required])],
        contactNumber: ['', Validators.compose([Validators.required])],
        emailAddress: [
          '',
          Validators.compose([
            Validators.email,
            Validators.required,
            Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
          ]),
        ],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(8)]),
        ],
        confirmPassword: ['', Validators.compose([Validators.required])],
      },
      { validators: this.passwordValidator('password', 'confirmPassword') }
    );
  }

  public passwordValidator(password: any, confirmPassword: any) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (
        confirmPasswordControl.errors ||
        confirmPasswordControl.errors?.['MustMatch']
      ) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        return confirmPasswordControl.setErrors({ MustMatch: true });
      } else {
        return confirmPasswordControl.setErrors(null);
      }
    };
  }

  public closeRegisterModal() {
    this.helperService.registerModal(false);
  }

  public loginModal(): void {
    this.helperService.registerModal(false);
    this.helperService.loginModalToggle(true);
  }

  public registerUser() {
    this.authenticationService.userRegister(this.formGroup.value);
  }

  public get form() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
    this.initializeForms();
  }
}
