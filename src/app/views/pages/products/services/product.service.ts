import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _HttpClient: HttpClient) {}

  getProduct(offset: number, limit: number): Observable<any> {
    return this._HttpClient
      .get<any>(`${environment.api}v1/products?offset=${offset}&limit=${limit}`)
      .pipe(
        map((products: any[]) =>
          products.map((product) => ({
            ...product,
            price: product.price * 10000,
          }))
        )
      );
  }

  getSingleProduct(id: number): Observable<any> {
    return this._HttpClient
      .get<any>(`${environment.api}v1/products/${id}`)
      .pipe(
        map((product: any) => ({
          ...product,
          price: product.price * 10000,
        }))
      );
  }

  getProductsByCategory(id: number): Observable<any> {
    return this._HttpClient
      .get<any>(
        `${environment.api}v1/categories/${id}/products?offset=0&limit=10`
      )
      .pipe(
        map((products: any[]) =>
          products.map((product) => ({
            ...product,
            price: product.price * 10000,
          }))
        )
      );
  }
}
