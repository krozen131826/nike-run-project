import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [CommonModule, SwiperModule],
  exports: [ProductDetailsComponent],
})
export class ProductDetailsModule {}
