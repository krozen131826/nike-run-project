import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar.component';
import { UserLoginModule } from '../user-login/user-login.module';
import { UserInfoModule } from '../user-info/user-info.module';
import { CartModule } from '../cart/cart.module';

@NgModule({
  declarations: [TopbarComponent],
  imports: [CommonModule, UserLoginModule, UserInfoModule, CartModule],
  exports: [TopbarComponent],
})
export class TopbarModule {}
