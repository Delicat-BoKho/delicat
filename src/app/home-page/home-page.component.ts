import { keyframes } from '@angular/animations';
import { JsonPipe } from '@angular/common';
import { TagContentType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/models/product-model';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(private api: ApiService) {}

  async ngOnInit(): Promise<void> {
    if (window.innerWidth < 1024) {
      this.checkSize = false;
    } else {
      this.checkSize = true;
    }

    await this.loadListItems();
    for (let i = 0; i < 4; i++) {
      this.tempListItemsBestSeller.push(this.templistItems[i]);
    }

    for (let i = this.templistItems.length - 1; i > 3; i--) {
      this.tempListItemsNewProduct.push(this.templistItems[i]);
    }
  }

  checkSize!: boolean;

  listItems!: ProductModel[];

  templistItems!: ProductModel[];

  templistItemsFinal!: ProductModel[];

  tempListItemsBestSeller: ProductModel[] = [];

  tempListItemsNewProduct: ProductModel[] = [];

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
    console.log(this.templistItemsFinal);
  }

  redirectToShop() {
    window.location.href = '/shop';
  }
}
