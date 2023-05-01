import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  products: Product[] = [];
  errMessage: string = '';

  isHaveProduct: boolean = true;

  sortFlag: 'asc' | 'des' = 'asc';

  constructor(private _router: Router, private service: ProductService) {
    this.getProducts();
  }

  // get all items in shop
  getProducts() {
    this.service.getProducts().subscribe({
      next: (res: any) => {
        this.products = res;

        if (this.products.length > 0) {
          this.isHaveProduct = false;
        }
      },
      error: (err) => {
        this.errMessage = err;
        console.log('Error occured while fetching file meta data');
      },
    });
  }

  // oder by asc
  orderByPrice() {
    this.sortFlag = 'asc';
    this.products = this.products.sort((a, b) => a.price - b.price);
  }

  // oder by desc
  orderDescByPrice() {
    this.sortFlag = 'des';
    this.products = this.products.sort((a, b) => (a.price - b.price) * -1);
  }

  viewShop() {
    this._router.navigate(['shop']);
  }
}
