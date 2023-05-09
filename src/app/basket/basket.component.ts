import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { ProductDetailModel } from 'src/models/product-model';
import { BasketModel } from '../../models/basket-model';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { User } from '../models/user';
import { CartItem } from '../models/cart';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  customerInfo!: User;
  errMessage: string = '';

  cartItemTemp!: CartItem;

  constructor(private _router: Router, private _cService: CustomerService) {
    this.getCustomerById();
  }

  // basket: BasketModel = localStorage.getItem('basket')
  //   ? JSON.parse(localStorage.getItem('basket')!)
  //   : {
  //       productDetails: [],
  //       total: 0,
  //       totalToPay: 0,
  //     };

  ngOnInit(): void {
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
  }

  totalPrice: number = 0;

  mapSum: Map<string, number> = new Map<string, number>();

  countItem: number = 0;

  // listItemDetail: ProductDetailModel[] = JSON.parse(
  //   localStorage.getItem('basket')!
  // ).productDetails;

  listItemDetailFinal!: ProductDetailModel[];

  // removeFromBasket(productDetailId: string) {
  //   this.basket.productDetails = this.basket.productDetails.filter(
  //     (p) => p.id !== productDetailId
  //   );
  //   localStorage.setItem('basket', JSON.stringify(this.basket));
  // }

  redirectToProductDetail() {
    window.location.href = '/payment';
  }

  // get customer by Id
  getCustomerById() {
    // console.log('Vào get customer by id');
    const token = localStorage.getItem('token')?.toString();
    const customerId = token?.replace(/"/g, '');

    if (customerId == null) {
      this._router.navigate(['login']);
    } else {
      this._cService.getCustomerById(customerId).subscribe({
        next: (res) => {
          this.customerInfo = res;

          this.cartItemTemp = res.cart[0];
          console.log(this.cartItemTemp);
          console.log(this.customerInfo);
        },
        error: (err) => {
          this.errMessage = err;
        },
      });
    }
  }

  updateCart(customerId: string, cartItem: CartItem) {
    // const token = localStorage.getItem('token')?.toString();
    // const checkcustomerId = token?.replace(/"/g, '');

    cartItem.quantity = 6;

    console.log('Hello');
    console.log(customerId, cartItem);

    this._cService.saveCart(customerId, cartItem);
  }
}
