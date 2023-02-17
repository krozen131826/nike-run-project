import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public defaultAPIURLHost: string = '';

  constructor(private httpClient: HttpClient) {}
}
