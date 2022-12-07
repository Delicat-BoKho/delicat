import { Component, OnInit } from '@angular/core';
import { ProductDetailModel, ProductModel } from 'src/models/product-model';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-product-basket',
  templateUrl: './product-basket.component.html',
  styleUrls: ['./product-basket.component.css'],
})
export class ProductBasketComponent implements OnInit {
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
      size: this.product.size[0],
      color: this.product.color[0],
    };

    this.mainImg = '../../assets/img/' + this.productDetail.imgURL;
    this.size = this.productDetail.size;
    this.color =
      this.productDetail.color[0].toUpperCase() +
      this.productDetail.color.substring(1);

    this.price = '$' + this.productDetail.price;
  }

  mainImg: string = '';
  size: string = '';
  color: string = '';
  price: string = '';

  product!: ProductModel;

  productDetail!: ProductDetailModel;

  listItems!: ProductModel[];

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
