import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() productDetail!: any;

  ratingStar: number[] = [];

  ratingStarGray: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.ratingStar = Array(this.productDetail!.reviews.ratingStar).fill(0);

    this.ratingStarGray = Array(5 - this.ratingStar.length).fill(0);
  }
}
