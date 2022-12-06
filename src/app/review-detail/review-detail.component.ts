import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css'],
})
export class ReviewDetailComponent implements OnInit {
  @Input() reviewDetail!: any;

  ratingStar: number[] = [];

  ratingStarGray: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.ratingStar = Array(this.reviewDetail!.reviews.ratingStar).fill(0);
    this.ratingStarGray = Array(5 - this.ratingStar.length).fill(0);
  }
}
