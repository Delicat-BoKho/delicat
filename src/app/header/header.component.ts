import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  isSearchOpen: boolean = false;

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }
}
