import { Component } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent {
  constructor(
    private _cService: CustomerService,
    private _oService: OrderService,
    private _aService: AccountService,
    private _router: Router
  ) {}

  getCustomerById() {}

  // save profile
  saveProfile() {}

  // log out account
  logout() {
    this._aService.logout();
    this._router.navigate(['login']);
  }
}
