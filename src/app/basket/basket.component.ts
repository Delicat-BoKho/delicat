import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { ProductDetailModel } from 'src/models/product-model';
import { BasketModel } from '../../models/basket-model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  constructor() {}

  basket: BasketModel = localStorage.getItem('basket')
    ? JSON.parse(localStorage.getItem('basket')!)
    : {
        productDetails: [],
        total: 0,
        totalToPay: 0,
      };

  ngOnInit(): void {
    // Lấy ra số lượng sản phẩm trong giả hàng
    this.countItem = Array.from(
      new Set(this.listItemDetail.map((s) => s.id))
    ).map((id) => {
      return {
        id: id,
      };
    }).length;

    // if (this.listItemDetail.length > 0) {
    //   for (let p of this.listItemDetail) {
    //     if (this.mapSum.has(p.id)) {
    //       this.mapSum.set(p.id, Number(this.mapSum.get(p.id)) + p.quantity);
    //     } else {
    //       this.mapSum.set(p.id, p.quantity);
    //     }
    //   }

    //   console.log(this.mapSum);
    // }

    // this.listItemDetailFinal = this.listItemDetail.filter((item) => {
    //   if (this.mapSum.has(item.id)) {
    //     item.quantity = Number(this.mapSum.get(item.id));
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });

    // this.listItemDetailFinal = this.listItemDetailFinal.filter(
    //   (element, index) => {
    //     return this.listItemDetailFinal.indexOf(element) === index;
    //   }
    // );

    // console.log(this.listItemDetailFinal);

    for (let i = 0; i < this.listItemDetail.length; i++)
      [(this.totalPrice += this.listItemDetail[i].price)];
  }

  totalPrice: number = 0;

  mapSum: Map<string, number> = new Map<string, number>();

  countItem: number = 0;

  listItemDetail: ProductDetailModel[] = JSON.parse(
    localStorage.getItem('basket')!
  ).productDetails;

  listItemDetailFinal!: ProductDetailModel[];

  removeFromBasket(productDetailId: string) {
    this.basket.productDetails = this.basket.productDetails.filter(
      (p) => p.id !== productDetailId
    );
    localStorage.setItem('basket', JSON.stringify(this.basket));
  }

  redirectToProductDetail() {
    window.location.href = '/payment';
  }
}
