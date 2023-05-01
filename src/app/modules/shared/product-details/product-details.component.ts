import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { SwiperOptions } from 'swiper';
import { HelperService } from '../service/helper.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(private helperService: HelperService) {}

  productDetail$ = this.helperService.productDetailsObs$.pipe(
    tap((data) => {
      this.primaryImage = data.image[0].imageLink;
    })
  );

  primaryImage: string = '';

  config: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 10,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  public closeProductModal(): void {
    this.helperService.productDetailsModal(false);
  }

  public selectProd(img: string): void {
    this.primaryImage = img;
  }

  ngOnInit(): void {}
}
