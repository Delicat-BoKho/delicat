import { Component, Input, OnInit } from '@angular/core';
import { Comments } from '../../models/product-model';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css'],
})
export class ReviewDetailComponent implements OnInit {
  @Input() reviewDetail!: Comments;

  ratingStar: number[] = [];

  ratingStarGray: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.ratingStar = Array(this.reviewDetail!.ratingComment).fill(0);
    this.ratingStarGray = Array(5 - this.ratingStar.length).fill(0);
  }
}
