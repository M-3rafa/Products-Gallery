import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { product } from '../../interfaces/iproduct';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClint: HttpClient) {}

  getAllProducts(): Observable<product[]> {
    return this.httpClint.get<product[]>(`${environment.baseUrl}/products`);
  }
  getById(_id: string): Observable<product> {
    return this.httpClint.get<product>(
      `${environment.baseUrl}/products/${_id}`
    );
  }

  getByCategory(category: string): Observable<product[]> {
    return this.httpClint.get<product[]>(
      `${environment.baseUrl}/products/category/${category}`
    );
  }
}
