import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  checkSize!: boolean;

  constructor() {}

  ngOnInit(): void {
    if (window.innerWidth < 1024) {
      this.checkSize = false;
    } else {
      this.checkSize = true;
    }
  }

  listItems: any[] = [];

  async loadListItems() {
    let jsonItems = await fetch('../../assets/data/products_suit.json')
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Sai' + response.status);
        }
        return response.json();
      })
      .then(function (json) {
        // console.log(json);

        return json;
      });

    this.listItems = jsonItems;
    console.log(this.listItems);
  }
}
