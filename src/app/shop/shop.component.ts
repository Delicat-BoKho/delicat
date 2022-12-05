import { keyframes } from '@angular/animations';
import { JsonPipe } from '@angular/common';
import { TagContentType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/models/product-model';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  checkSize!: boolean;

  //Test
  templistItemsPrice: ProductModel[] = [];

  checkFirstFilter: boolean = true;

  previousPriceFilter: number = 5000;

  sortFlag: 'asc' | 'des' = 'asc';

  listItems: ProductModel[] = [];

  templistItems: ProductModel[] = [];

  templistItemsFinal: ProductModel[] = [];

  arrayFilter: Map<string, string[]> = new Map<string, string[]>();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    if (window.innerWidth < 1024) {
      this.checkSize = false;
    } else {
      this.checkSize = true;
    }

    this.arrayFilter.set('size', []);
    this.arrayFilter.set('color', []);
    this.arrayFilter.set('tag', []);

    this.loadListItems();
  }

  // checkTag!: boolean;

  async loadListItems() {
    let jsonItemsSuit = await this.api.loadDataJson(
      '../../assets/data/products_suit.json'
    );

    let jsonItemsAccessories = await this.api.loadDataJson(
      '../../assets/data/products_accessories.json'
    );

    this.listItems = jsonItemsSuit.concat(jsonItemsAccessories);

    // Gán mảng tạm để filter
    this.templistItems = this.listItems;
    this.templistItemsFinal = this.listItems;
  }

  filter(event: Event, stringFilter: string, typeFilter: string) {
    let includeFilter: boolean = this.arrayFilter
      .get(typeFilter)!
      .includes(stringFilter);

    if ((event.target as HTMLInputElement).checked) {
      if (!includeFilter) {
        this.arrayFilter.get(typeFilter)!.push(stringFilter);
      }
    } else {
      this.arrayFilter
        .get(typeFilter)
        ?.splice(this.arrayFilter.get(typeFilter)!.indexOf(stringFilter), 1);
    }
    // console.log('array filter: ', this.arrayFilter);

    this.templistItems = [];

    /* Mã giả
    foreach i in list:
      if filter: i == true then
        arr.push(i)
      return arr
    */

    // Xử lý filter

    this.templistItems = this.listItems.filter((product) => {
      let result: boolean = true;
      [...this.arrayFilter.keys()].forEach((k) => {
        if (this.arrayFilter.get(k)!.length > 0) {
          switch (typeof product[k as keyof ProductModel]) {
            case 'string':
              if (
                !this.arrayFilter
                  .get(k)!
                  .includes(product[k as keyof ProductModel] as string)
              ) {
                result = false;
                return;
              }
              break;
            case 'number':
              break;
            default:
              let valueProps = product[k as keyof ProductModel] as string[];
              let matchCount: number = 0;
              this.arrayFilter.get(k)!.forEach((f) => {
                if (valueProps.includes(f)) {
                  matchCount++;
                }
              });
              if (matchCount <= 0) {
                result = false;
                return;
              }
              break;
          }
        }
      });
      this.checkFirstFilter = false;
      return result;
    });

    this.filterPrice(this.previousPriceFilter.toString());
  }

  filterPrice(price: string) {
    this.previousPriceFilter = Number(price);
    console.log(this.previousPriceFilter.toString());
    this.templistItemsFinal = this.templistItems.filter(
      (p) => p.price <= this.previousPriceFilter
    );
    switch (this.sortFlag) {
      case 'asc':
        this.orderByPrice();
        break;
      case 'des':
        this.orderDescByPrice();
        break;
    }
  }

  orderByPrice() {
    this.sortFlag = 'asc';
    this.templistItemsFinal = this.templistItemsFinal.sort(
      (a, b) => a.price - b.price
    );
  }

  orderDescByPrice() {
    this.sortFlag = 'des';
    this.templistItemsFinal = this.templistItemsFinal.sort(
      (a, b) => (a.price - b.price) * -1
    );
  }
}
