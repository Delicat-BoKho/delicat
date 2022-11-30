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

  templistItems: any[] = [];

  arrayFilter: string[] = [];

  checkTag!: boolean;

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

    // Gán mảng tạm để filter
    this.templistItems = this.listItems;
  }

  filter(event: Event, stringFilter: string) {
    if ((event.target as HTMLInputElement).checked) {
      if (!this.arrayFilter.includes(stringFilter)) {
        this.arrayFilter.push(stringFilter);
      }
    } else {
      // Xóa phần tử (Remove item)
      console.log(this.arrayFilter);

      this.arrayFilter.splice(this.arrayFilter.indexOf(stringFilter), 1);
      console.log(this.arrayFilter);
    }

    if (this.arrayFilter.length == 0) {
      this.templistItems = this.listItems;
      return;
    }

    this.templistItems = [];

    this.arrayFilter.forEach((itemFilter) => {
      this.templistItems = this.templistItems.concat(
        this.listItems.filter((product) => {
          return product.tag == itemFilter;
        })
      );
    });
  }
}
