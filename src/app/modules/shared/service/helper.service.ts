import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductInterface } from '../interface/products/product.interface';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  // Subjects Section
  private loginModalSub$ = new BehaviorSubject<boolean>(false);
  public loginModalObs$ = this.loginModalSub$.asObservable();

  private userInfoModalSub$ = new BehaviorSubject<boolean>(false);
  public userInfoModalObs$ = this.userInfoModalSub$.asObservable();

  private cartModalSub$ = new BehaviorSubject<boolean>(false);
  public cartModalObs$ = this.cartModalSub$.asObservable();

  private registerModalSub$ = new BehaviorSubject<boolean>(false);
  public registerModalObs$ = this.registerModalSub$.asObservable();

  private productDetailModalSub$ = new BehaviorSubject<boolean>(false);
  public productDetailModalObs$ = this.productDetailModalSub$.asObservable();

  private productDetailsSub$ = new BehaviorSubject<ProductInterface>(
    {} as ProductInterface
  );
  public productDetailsObs$ = this.productDetailsSub$.asObservable();

  // Action Section
  public loginModalToggle(bool: boolean): void {
    this.loginModalSub$.next(bool);
  }

  public userInfoModal(bool: boolean): void {
    this.userInfoModalSub$.next(bool);
  }

  public cartModal(bool: boolean): void {
    this.cartModalSub$.next(bool);
  }

  public registerModal(bool: boolean): void {
    this.registerModalSub$.next(bool);
  }

  public productDetailsModal(bool: boolean) {
    this.productDetailModalSub$.next(bool);
  }

  public productDetails(prod: ProductInterface) {
    this.productDetailsSub$.next(prod);
  }
}
