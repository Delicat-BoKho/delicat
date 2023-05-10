import { Component, Input, OnInit } from '@angular/core';
import { BasketModel } from 'src/models/basket-model';
import { ProductDetailModel, ProductModel } from 'src/models/product-model';
import { ApiService } from 'src/services/api.service';
import { Product } from '../models/product';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { CartItem } from '../models/cart';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-basket',
  templateUrl: './product-basket.component.html',
  styleUrls: ['./product-basket.component.css'],
})
export class ProductBasketComponent implements OnInit {
  @Input() cartItem!: CartItem;
  productDetail: Product = new Product();

  sizeChose: string = '';
  colorChose: string = '';

  errMessage: string = '';

  constructor(
    private _cService: CustomerService,
    private _pService: ProductService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getProductById(this.cartItem.productId);
    const describe = this.splitDescribe(this.cartItem.description);
    this.sizeChose = describe[0];
    this.colorChose = describe[1];
  }

  // get product detail by id in url
  getProductById(id: any) {
    this._pService.getProduct(id).subscribe({
      next: (res) => {
        this.productDetail = res;
      },
      error: (err) => {
        this.errMessage = err;
        console.log('Error occured while fetching file meta data');
      },
    });
  }

  splitDescribe(describe: string): [string, string] {
    var temp = describe.split(',');
    var color = temp[0];
    var size = temp[1];
    return [size, color];
  }

  // get customer by Id
  // getCustomerById() {
  //   // console.log('Vào get customer by id');
  //   const token = localStorage.getItem('token')?.toString();
  //   const customerId = token?.replace(/"/g, '');

  //   if (customerId == null) {
  //     this._router.navigate(['login']);
  //   } else {
  //     this._cService.getCustomerById(customerId).subscribe({
  //       next: (res) => {
  //         // this.customerInfo = res;
  //       },
  //       error: (err) => {
  //         this.errMessage = err;
  //       },
  //     });
  //   }
  // }

  basket: BasketModel = localStorage.getItem('basket')
    ? JSON.parse(localStorage.getItem('basket')!)
    : {
        productDetails: [],
        total: 0,
        totalToPay: 0,
      };

  productBasket: Product = new Product();

  removeFromBasket(productDetailId: string) {
    this.basket.productDetails = this.basket.productDetails.filter(
      (p) => p.id !== productDetailId
    );
    localStorage.setItem('basket', JSON.stringify(this.basket));
    window.location.reload();
  }

  updateQuantity(customerId: string, cartItem: CartItem) {
    // Đã login

    // Chưa login

    cartItem.quantity = 6;

    console.log('Hello');
    console.log(customerId, cartItem);

    this._cService.saveCart(customerId, cartItem);
  }
}

// productDetail!: ProductDetailModel;

// changeQuantity(quantity: number) {
//   if (this.productDetail.quantity <= 0 && quantity < 0) {
//     this.productDetail.quantity == 0;
//     return;
//   }
//   this.productDetail.quantity += quantity;
// }

// redirectToProductDetail() {
//   window.location.href = '/shop/product-detail?id=' + this.productBasket.id;
// }
