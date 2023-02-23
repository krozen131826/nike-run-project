import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user-register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserRegisterComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [UserRegisterComponent],
})
export class UserRegisterModule {}
