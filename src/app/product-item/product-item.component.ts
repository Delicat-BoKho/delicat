import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/models/product-model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() productDetail!: ProductModel;

  ratingStar: number[] = [];

  ratingStarGray: number[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.productDetail.id);
    this.ratingStar = Array(this.productDetail.reviews.ratingStar).fill(0);
    this.ratingStarGray = Array(5 - this.ratingStar.length).fill(0);
  }

  redirectToProductDetail() {
    window.location.href = '/shop/product-detail?id=' + this.productDetail.id;
  }
}
