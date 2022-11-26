import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  color = 'blue';
  background = 'yellow';
  changeColor() {
    this.color = 'tomato';
    this.background = 'teal';
  }

  currentImgHeight = '350px !important';
  currentImgWidth = '225px !important';
}
