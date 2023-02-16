import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MensComponent } from './components/mens/mens.component';
import { WomensComponent } from './components/womens/womens.component';
import { KidsComponent } from './components/kids/kids.component';
import { TopbarModule } from '../shared/topbar/topbar.module';

@NgModule({
  declarations: [HomeComponent, MensComponent, WomensComponent, KidsComponent],
  imports: [CommonModule, HomeRoutingModule, TopbarModule],
})
export class HomeModule {}
