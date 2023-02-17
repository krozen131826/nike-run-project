import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserLoginComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [UserLoginComponent],
})
export class UserLoginModule {}
