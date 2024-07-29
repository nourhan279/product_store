import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedSort: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.fetchproduct().subscribe((response) => {
      this.products = response.products;
      this.filteredProducts = this.products;
      this.categories = [
        ...new Set(this.products.map((product) => product.category)),
      ];
    });
  }

  filterAndSortProducts(): void {
    this.filteredProducts = this.products.filter(
      (product) =>
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.selectedCategory
          ? product.category === this.selectedCategory
          : true)
    );

    if (this.selectedSort === 'asc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.selectedSort === 'desc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  viewItem(product: Product): void {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    this.router.navigate(['/View-item']);
  }
}
