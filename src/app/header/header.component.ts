import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  isSearchOpen: boolean = false;

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  checkLogin() {
    console.log(typeof localStorage.getItem('token'));

    if (localStorage.getItem('token') == null) {
      this._router.navigate(['login']);
    } else {
      this._router.navigate(['user/profile']);
    }
  }
}
