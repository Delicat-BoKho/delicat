import { Component, Input, OnInit } from '@angular/core';
import { ProductDetailModel } from 'src/models/product-model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  countItemsBasket: number = 0;

  totalPrice: number = 0;

  constructor() {}

  ngOnInit(): void {
    // this.countItemsBasket = this.listItemDetail.length;
    // console.log(this.listItemDetail);
    // for (let i = 0; i < this.listItemDetail.length; i++) {
    //   this.totalPrice +=
    //     this.listItemDetail[i].quantity * this.listItemDetail[i].price;
    // }
  }

  // listItemDetail: ProductDetailModel[] = JSON.parse(
  //   localStorage.getItem('basket')!
  // ).productDetails;
}
