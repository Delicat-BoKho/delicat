import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/models/product-model';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-item-wishlist',
  templateUrl: './product-item-wishlist.component.html',
  styleUrls: ['./product-item-wishlist.component.css'],
})
export class ProductItemWishlistComponent {
  @Input() productDetail!: Product;

  ratingStar: number[] = [];
  ratingStarGray: number[] = [];
  countReviews: number = 0;

  constructor(private _router: Router, private service: ProductService) {}

  ngOnInit(): void {
    console.log(this.productDetail.id);

    // get count reviews of item
    this.countReviews = this.productDetail.reviews.length;

    // get rating star avg
    this.ratingStar = Array(this.getRatingStar()).fill(0);
    this.ratingStarGray = Array(5 - this.ratingStar.length).fill(0);
  }

  // get rating star of item
  getRatingStar() {
    var totalStar: number[] = [];
    var ratingStar = 0;

    for (let i = 0; i < this.productDetail.reviews.length; i++) {
      totalStar.push(this.productDetail.reviews[i].ratingComment);
    }

    ratingStar = Math.round(
      totalStar.reduce((acc, val) => acc + val, 0) / totalStar.length
    );

    return ratingStar;
  }

  // virew item detail
  viewProductDetail(f: any) {
    this._router.navigate(['shop/product-detail', f.id]);
  }

  // remove item in wishlist
  removeWishlist() {}
}
