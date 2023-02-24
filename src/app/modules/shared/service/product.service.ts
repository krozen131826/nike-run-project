import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, filter, map, Subject, switchMap, tap } from 'rxjs';
import { ProductInterface } from '../interface/products/product.interface';
import { ServiceResponseInterface } from '../interface/service-response/service-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  // Subjects Sections

  private productCategorySub$ = new BehaviorSubject<string>('');
  public productCategoryObs$ = this.productCategorySub$.asObservable();

  public products$ = this.productCategoryObs$.pipe(
    switchMap((cat) => {
      return this.httpClient
        .get<ServiceResponseInterface<ProductInterface[]>>(
          this.apiUrl + '/api/Product/list'
        )
        .pipe(
          map((res) => {
            return res.data.filter((d: ProductInterface) => d.category == cat);
          })
        );
    })
  );

  // Action Section

  public getProductByCategory(cat: string): void {
    this.productCategorySub$.next(cat);
  }
}
