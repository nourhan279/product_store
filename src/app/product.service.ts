import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  fetchproduct(): Observable<{ products: Product[] }> {
    return this.http.get<{ products: Product[] }>(this.api);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }
}
