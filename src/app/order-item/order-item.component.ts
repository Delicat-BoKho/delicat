import { Component, Input } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { Order } from '../models/order';
import { SaleProducts } from '../models/saleProduc';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
})
export class OrderItemComponent {
  @Input() orderDetail!: Order;

  orderItemShow!: SaleProducts;
  imgorderItemShow: string = '';

  constructor(private _oService: OrderService, private _router: Router) {}

  // get product by id

  // lấy ra sản phẩm đầu tiên để hiển thị

  // view order detail
  viewOrderDetail(f: string) {
    this._router.navigate(['user/order/:id', f]);
  }
}
