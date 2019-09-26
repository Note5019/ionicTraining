import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  addProduct(product) {
    return this.http.post(this.baseUrl + '/products', product);
  }

  updateProduct(product) {
    return this.http.put(`${this.baseUrl}/products/${product.id}`, product);
  }

  getProducts() {
    return this.http.get(this.baseUrl + '/products');
  }

  getProductById(productId: number) {
    return this.http.get(`${this.baseUrl}/products/${productId}`);
  }
}