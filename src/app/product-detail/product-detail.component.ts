import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product, ProductDetail } from '../models/product';
import { async } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  // sản phẩm chi tiết để hiện UI
  productDetail: Product = new Product();

  // sản phẩm bán được thêm vào cart
  productDetailBuy: ProductDetail = new ProductDetail();

  mainImg: string = '';
  subImg_0: string = '';
  subImg_1: string = '';
  subImg_2: string = '';
  ratingStar: number[] = [];
  ratingStarGray: number[] = [];
  errMessage: any;

  selectSizeDefault: string = '';
  selectColorDefault: string = '';
  sizeChecked: string = '';
  colorChecked: string = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private _router: Router,
    private service: ProductService
  ) {
    activateRoute.paramMap.subscribe((param) => {
      let id = param.get('id');

      if (id != null) {
        this.getProductById(id);
      }
    });
  }

  ngOnInit() {}

  //=========================//

  // get product detail by id in url
  getProductById(id: any) {
    this.service.getProduct(id).subscribe({
      next: (res: any) => {
        console.log('Vào gọi sản phẩm');
        this.productDetail = res;
        // this.productDetailShow = res;
        console.log(this.productDetail);

        this.mainImg = this.productDetail.imgURL[0];
        this.subImg_0 = this.productDetail.imgURL[0];
        this.subImg_1 = this.productDetail.imgURL[1];
        this.subImg_2 = this.productDetail.imgURL[2];
        this.selectSizeDefault = this.productDetail.size[0];
        this.selectColorDefault = this.productDetail.color[0];
        this.sizeChecked = this.productDetail.size[0];
        this.colorChecked = this.productDetail.color[0];

        this.setProductToBuy();
        console.log(this.productDetailBuy);
      },
      error: (err) => {
        this.errMessage = err;
        console.log('Error occured while fetching file meta data');
      },
    });
  }

  setProductToBuy() {
    this.productDetailBuy.id = this.productDetail.id;
    this.productDetailBuy.name = this.productDetail.name;
    this.productDetailBuy.type = this.productDetail.type;
    this.productDetailBuy.price = this.productDetail.price;
    this.productDetailBuy.imgURL = this.productDetail.imgURL;
    this.productDetailBuy.describe = this.productDetail.describe;
    this.productDetailBuy.tag = this.productDetail.tag;
    this.productDetailBuy.size = this.productDetail.size[0];
    this.productDetailBuy.color = this.productDetail.color[0];
    this.productDetailBuy.reviews = this.productDetail.reviews;
    this.productDetailBuy.quantity = 1;
    console.log(this.productDetailBuy);
  }

  // change img show
  changeImg(event: Event) {
    this.mainImg = (event.target as HTMLImageElement).src;
  }

  changeSize(event: Event, size: string) {
    if ((event.target as HTMLInputElement).checked) {
      this.productDetailBuy.size = size;
      this.selectSizeDefault = this.productDetailBuy.size;
      this.sizeChecked = this.selectSizeDefault;
    } else {
      this.productDetailBuy.size = ' ';
      this.selectSizeDefault = '';
      this.sizeChecked = '';
    }
  }

  // change color to buy
  changeColor(event: Event, color: string) {
    if ((event.target as HTMLInputElement).checked) {
      this.productDetailBuy.color = color;
      this.selectColorDefault = this.productDetailBuy.color;
      this.colorChecked = this.selectColorDefault;
    } else {
      this.productDetailBuy.color = ' ';
      this.selectColorDefault = '';
      this.colorChecked = '';
    }
  }

  // change quantity to buy
  changeQuantity(quantity: number) {
    if (this.productDetailBuy.quantity <= 0 && quantity < 0) {
      this.productDetailBuy.quantity == 0;
      return;
    }
    this.productDetailBuy.quantity += quantity;
  }

  // get rating star of item
  getRatingStar() {
    var totalStar: number[] = [];
    var ratingStar = 0;

    for (let i = 0; i < this.productDetail.reviews.length; i++) {
      totalStar.push(this.productDetail.reviews[i].ratingComment);
    }

    ratingStar = Math.round(
      totalStar.reduce((acc, val) => acc + val, 0) / totalStar.length
    );

    return ratingStar;
  }

  viewBasket() {
    this._router.navigate(['basket']);
  }

  viewPayment() {
    this._router.navigate(['payment']);
  }

  //================ OLD =================//

  // addToCart() {
  //   let basket: BasketModel = JSON.parse(localStorage.getItem('basket')!);
  //   if (basket == null) {
  //     basket = {
  //       productDetails: [],
  //       total: 0,
  //       totalToPay: 0,
  //     };
  //   }
  //   basket.productDetails.push(this.productDetail);
  //   localStorage.setItem('basket', JSON.stringify(basket));
  // }

  // async loadListItems() {
  //   let jsonItemsSuit = await this.api.loadDataJson(
  //     '../../assets/data/products_suit.json'
  //   );

  //   let jsonItemsAccessories = await this.api.loadDataJson(
  //     '../../assets/data/products_accessories.json'
  //   );

  //   this.listItems = jsonItemsSuit.concat(jsonItemsAccessories);

  //   this.product = this.listItems.find((item) => item.id == this.idSearch)!;

  // }

  // await this.loadListItems();
  // this.productDetail = {
  //   id: this.product.id,
  //   name: this.product.name,
  //   price: this.product.price,
  //   imgURL: this.product.imgURL[0],
  //   describe: this.product.describe,
  //   tag: this.product.tag,
  //   quantity: 0,
  //   size: ' ',
  //   color: ' ',
  //   reviews: this.product.reviews,
  // };
  // this.ratingStar = Array(this.productDetail.reviews.ratingStar).fill(0);
  // this.ratingStarGray = Array(5 - this.ratingStar.length).fill(0);
  // this.ratingStar = Array(this.getRatingStar()).fill(0);
  // this.ratingStarGray = Array(5 - this.ratingStar.length).fill(0);
  // console.log(this.productDetail);

  // idSearch: string = new URLSearchParams(window.location.search).get('id')!;
}
