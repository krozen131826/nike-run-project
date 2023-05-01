import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [CommonModule, SwiperModule, FormsModule],
  exports: [ProductDetailsComponent],
})
export class ProductDetailsModule {}
