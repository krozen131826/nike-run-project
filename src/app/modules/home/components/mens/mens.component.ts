import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ProductInterface } from 'src/app/modules/shared/interface/products/product.interface';
import { HelperService } from 'src/app/modules/shared/service/helper.service';
import { ProductService } from 'src/app/modules/shared/service/product.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-mens',
  templateUrl: './mens.component.html',
  styleUrls: ['./mens.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MensComponent implements OnInit {
  constructor(
    private helperService: HelperService,
    private productService: ProductService
  ) {}
  @ViewChild('swiper', { static: false }) swiper!: SwiperComponent;

  products$ = this.productService.products$.pipe(
    tap((data) => {
      this.productInit = {
        ...data[0],
        image: data[0].image,
      };
    })
  );

  productDetailModal$ = this.helperService.productDetailModalObs$;

  productInit = {} as ProductInterface;

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 20,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  userName$ = this.helperService.userNameObs$;

  slideNext() {
    this.swiper.swiperRef.slideNext(500);
  }
  slidePrev() {
    this.swiper.swiperRef.slidePrev(500);
  }

  public selectProd(data: ProductInterface): void {
    this.productInit = {
      ...data,
      image: data.image,
    };
  }

  public productDetail(prod: ProductInterface): void {
    this.helperService.productDetailsModal(true);
    this.helperService.productDetails(prod);
  }

  ngOnInit(): void {
    this.productService.getProductByCategory('Mens');
  }
}
