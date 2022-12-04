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

  previousPriceFilter: number = 0;

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

  listItems: ProductModel[] = [];

  templistItems: ProductModel[] = [];

  arrayFilter: Map<string, string[]> = new Map<string, string[]>();

  checkTag!: boolean;

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
  }

  filter(event: Event, stringFilter: string, typeFilter: string) {
    if (typeFilter == 'price') {
      if (this.checkFirstFilter) {
        this.templistItemsPrice = this.listItems.filter((product) => {
          if (product.price <= Number(stringFilter)) {
            return true;
          }
          return false;
        });
        this.checkFirstFilter = false;
        this.templistItems = this.templistItemsPrice;
        this.previousPriceFilter = Number(stringFilter);
        return;
      } else {
        this.templistItemsPrice = this.listItems.filter((product) => {
          if (product.price <= Number(stringFilter)) {
            return true;
          }
          return false;
        });

        if (this.previousPriceFilter > Number(stringFilter)) {
          this.templistItems = this.templistItems
            .concat(this.templistItemsPrice)
            .filter((value, index, self) => self.indexOf(value) !== index);
          return;
        } else {
          this.templistItems = this.templistItems
            .concat(this.templistItemsPrice)
            .filter((value, index, self) => self.indexOf(value) === index);
          return;
        }
      }
    }
    this.checkFirstFilter = false;

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
        // console.log(
        //   'product.' + k + ' = ',
        //   product[k as keyof ProductModel] as string
        // );
        if (this.arrayFilter.get(k)!.length > 0) {
          if (typeof product[k as keyof ProductModel] === 'string') {
            if (
              !this.arrayFilter
                .get(k)!
                .includes(product[k as keyof ProductModel] as string)
            ) {
              result = false;
              return;
            }
          } else {
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
          }
        }
      });
      return result;
    });

    // this.templistItems = this.templistItems.filter(
    //   (value, index, self) => self.indexOf(value) !== index
    // );

    // console.log(this.templistItems);
  }
}
