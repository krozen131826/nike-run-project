import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserInfoComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [UserInfoComponent],
})
export class UserInfoModule {}
