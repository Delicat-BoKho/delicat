import { Component, Input, OnInit } from '@angular/core';
import { BasketModel } from 'src/models/basket-model';
import { ProductDetailModel, ProductModel } from 'src/models/product-model';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-product-basket',
  templateUrl: './product-basket.component.html',
  styleUrls: ['./product-basket.component.css'],
})
export class ProductBasketComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  basket: BasketModel = localStorage.getItem('basket')
    ? JSON.parse(localStorage.getItem('basket')!)
    : {
        productDetails: [],
        total: 0,
        totalToPay: 0,
      };

  @Input() productBasket!: ProductDetailModel;

  productDetail!: ProductDetailModel;

  changeQuantity(quantity: number) {
    if (this.productDetail.quantity <= 0 && quantity < 0) {
      this.productDetail.quantity == 0;
      return;
    }
    this.productDetail.quantity += quantity;
  }

  redirectToProductDetail() {
    window.location.href = '/shop/product-detail?id=' + this.productBasket.id;
  }

  removeFromBasket(productDetailId: string) {
    this.basket.productDetails = this.basket.productDetails.filter(
      (p) => p.id !== productDetailId
    );
    localStorage.setItem('basket', JSON.stringify(this.basket));
    window.location.reload();
  }
}
