import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStrorageService } from 'src/app/local-strorage.service';
import { AddToCartInterface } from '../interface/cart/add-to-cart.interface';
import { BehaviorSubject, catchError, of, Subject, switchMap } from 'rxjs';
import { ServiceResponseInterface } from '../interface/service-response/service-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  // Subjects Section
  private addToCartSub$ = new Subject<AddToCartInterface>();
  public addToCartObs$ = this.addToCartSub$.asObservable();

  public addToCart$ = this.addToCartObs$.pipe(
    switchMap((prodToCart) => {
      return this.httpClient.post<ServiceResponseInterface<string>>(
        this.apiUrl + '/api/cart/addToCart/',
        JSON.stringify(prodToCart)
      );
    }),
    catchError((err) => of([]))
  );

  // Action Functions

  public addTocart(prodToCart: AddToCartInterface): void {
    this.addToCartSub$.next(prodToCart);
  }
}
