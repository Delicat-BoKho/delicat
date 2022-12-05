import { Component, Input, OnInit } from '@angular/core';
import { ProductDetailModel, ProductModel } from 'src/models/product-model';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  constructor(private api: ApiService) {}

  async ngOnInit(): Promise<void> {
    await this.loadListItems();
    this.productDetail = {
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      imgURL: this.product.imgURL[0],
      describe: this.product.describe,
      tag: this.product.tag,
      quantity: 0,
      size: ' ',
      color: ' ',
    };

    this.mainImg = '../../assets/img/' + this.productDetail.imgURL;
  }

  mainImg: string = '';

  product!: ProductModel;

  productDetail!: ProductDetailModel;

  listItems!: ProductModel[];

  changeImg(event: Event) {
    this.mainImg = (event.target as HTMLImageElement).src;
  }

  changeSize(event: Event, size: string) {
    if ((event.target as HTMLInputElement).checked) {
      this.productDetail.size = size;
    } else {
      this.productDetail.size = ' ';
    }
  }

  async loadListItems() {
    let jsonItemsSuit = await this.api.loadDataJson(
      '../../assets/data/products_suit.json'
    );

    let jsonItemsAccessories = await this.api.loadDataJson(
      '../../assets/data/products_accessories.json'
    );

    this.listItems = jsonItemsSuit.concat(jsonItemsAccessories);
    this.product = this.listItems[0];
    console.log(this.product);
    // Gán mảng tạm để filter
  }

  changeQuantity(quantity: number) {
    if (this.productDetail.quantity <= 0 && quantity < 0) {
      this.productDetail.quantity == 0;
      return;
    }
    this.productDetail.quantity += quantity;
  }
}
