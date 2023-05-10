import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { ProductDetailModel } from 'src/models/product-model';
import { BasketModel } from '../../models/basket-model';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { User } from '../models/user';
import { CartItem } from '../models/cart';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  customerInfo: User = new User();
  errMessage: string = '';
  cartItems: CartItem[] = [];
  totalItems: number = 0;
  totalPrice: number = 0;

  cartItemTemp!: CartItem;

  // mapSum: Map<string, number> = new Map<string, number>();

  constructor(
    private _router: Router,
    private _cService: CustomerService,
    private _pService: ProductService
  ) {
    this.getCustomerById();
  }

  ngOnInit(): void {}

  // check login
  checkLogin() {
    const token = localStorage.getItem('token')?.toString();
    const customerId = token?.replace(/"/g, '');
  }

  // get customer by Id
  getCustomerById() {
    const token = localStorage.getItem('token')?.toString();
    const customerId = token?.replace(/"/g, '');

    if (typeof customerId !== 'undefined') {
      this._cService.getCustomerById(customerId).subscribe({
        next: (res) => {
          this.customerInfo = res;
          this.cartItems = res.cart;
          this.totalItems = this.cartItems.length;
          // this.totalPrice = this.customerInfo.
        },
        error: (err) => {
          this.errMessage = err;
        },
      });
    } else {
      const cartLocalStorage = localStorage.getItem('cart');
      let myArray = [];

      // Chưa login: kiểm tra đã tồn tại cart trong localStorage chưa
      if (cartLocalStorage) {
        myArray = JSON.parse(cartLocalStorage);

        // lấy cart trên localStorage vào cart để hiển thị
      }
    }

    // if (customerId == null) {
    //   this._router.navigate(['login']);
    // } else {
    // }
  }

  // get product detail by id in url
  getProductById(id: any) {
    this._pService.getProduct(id).subscribe({
      next: (res) => {
        // this.productDetail = res;
      },
      error: (err) => {
        this.errMessage = err;
        console.log('Error occured while fetching file meta data');
      },
    });
  }

  // payment
  payment() {}
}

// basket: BasketModel = localStorage.getItem('basket')
//   ? JSON.parse(localStorage.getItem('basket')!)
//   : {
//       productDetails: [],
//       total: 0,
//       totalToPay: 0,
//     };

// Lấy ra số lượng sản phẩm trong giả hàng
// this.countItem = Array.from(
//   new Set(this.listItemDetail.map((s) => s.id))
// ).map((id) => {
//   return {
//     id: id,
//   };
// }).length;
// for (let i = 0; i < this.listItemDetail.length; i++)
//   [
//     (this.totalPrice +=
//       this.listItemDetail[i].price * this.listItemDetail[i].quantity),
//   ];

// removeFromBasket(productDetailId: string) {
//   this.basket.productDetails = this.basket.productDetails.filter(
//     (p) => p.id !== productDetailId
//   );
//   localStorage.setItem('basket', JSON.stringify(this.basket));
// }

// updateQuantity(customerId: string, cartItem: CartItem) {
//   cartItem.quantity = 6;

//   console.log('Hello');
//   console.log(customerId, cartItem);

//   this._cService.saveCart(customerId, cartItem);
// }
