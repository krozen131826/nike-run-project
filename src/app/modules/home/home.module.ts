import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MensComponent } from './components/mens/mens.component';
import { WomensComponent } from './components/womens/womens.component';
import { KidsComponent } from './components/kids/kids.component';
import { TopbarModule } from '../shared/topbar/topbar.module';
import { SwiperModule } from 'swiper/angular';
import { ProductDetailsModule } from '../shared/product-details/product-details.module';

@NgModule({
  declarations: [HomeComponent, MensComponent, WomensComponent, KidsComponent],
  imports: [CommonModule, HomeRoutingModule, TopbarModule, SwiperModule, ProductDetailsModule],
})
export class HomeModule {}
