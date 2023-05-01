import { Component, OnInit } from '@angular/core';
import { combineLatest, map, tap } from 'rxjs';
import { LocalStrorageService } from 'src/app/local-strorage.service';
import { SwiperOptions } from 'swiper';
import { AddToCartInterface } from '../interface/cart/add-to-cart.interface';
import { ProductInterface } from '../interface/products/product.interface';
import { CartService } from '../service/cart.service';
import { HelperService } from '../service/helper.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private helperService: HelperService,
    private cartService: CartService,
    private localStorageService: LocalStrorageService
  ) {}

  productToCart = {
    quantity: 1,
  } as AddToCartInterface;

  productDetail$ = this.helperService.productDetailsObs$.pipe(
    tap((data) => {
      this.primaryImage = data.image[0].imageLink;
      this.productToCart.size = data.productDetails[0].size;
    })
  );

  vm$ = combineLatest([
    this.productDetail$,
  ]).pipe(
    map(([productDetail]) => ({ productDetail })),
    tap((data) => {
    })
  );

  addToCart$ = this.cartService.addToCart$;

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

  public addToCart(
    prod: ProductInterface,
    prodTocart: AddToCartInterface
  ): void {
    let addToCart: AddToCartInterface = {
      productName: prod.productName,
      description: prod.productName,
      price: prod.productDetails[0].price,
      userId: prodTocart.userId,
      productId: prod.id,
      imageLink: prod.image[0].imageLink,
      quantity: prodTocart.quantity,
      size: +prodTocart.size,
    };

    this.cartService.addTocart(addToCart);
  }

  public addQuantity(): void {
    this.productToCart.quantity = ++this.productToCart.quantity;
  }
  public minusQuantity(): void {
    this.productToCart.quantity = --this.productToCart.quantity;
  }

  onChange(event: any) {
    if (event.target.value < 0) {
      this.productToCart.quantity = 0;
    }
  }

  ngOnInit(): void {}
}
