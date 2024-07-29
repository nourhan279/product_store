import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss'],
})
export class ViewItemComponent implements OnInit {
  product: Product | null = null;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.form = this.fb.group({
      quantity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService
        .getProductById(productId)
        .subscribe((product: Product | null) => {
          this.product = product;
        });
    }
  }

  addToCart(): void {
    if (this.form.valid && this.product) {
      let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
      const exists = cart.find((item) => item.id === this.product!.id);
      if (exists) {
        alert('This item is already in your cart.');
      } else {
        const confirmed = confirm(
          'Are you sure to add this item to your cart?'
        );
        if (confirmed) {
          const quantity = this.form.get('quantity')?.value;
          const productWithQuantity = { ...this.product, quantity: quantity };
          cart.push(productWithQuantity);
          localStorage.setItem('cart', JSON.stringify(cart));
          alert('Item added to cart');
          this.router.navigate(['/cart']);
        }
      }
    } else {
      alert('Please provide a valid quantity.');
    }
  }
}
