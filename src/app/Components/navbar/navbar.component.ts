import { Component, AfterViewInit, HostListener } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import * as bootstrap from 'bootstrap';
import { IAuthData } from '../../Models/auth/i-auth-data';

@Component({
  selector: '.app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit {

  constructor(private authService: AuthService) {}

  hide!: boolean;
  isLoggedIn$!: boolean;
  myUser!: IAuthData;


  ngOnInit() {
    this.authService.user$.subscribe(res => {
      if (res) this.myUser = res;
    });
    this.authService.isLoggedIn$.subscribe(res => this.isLoggedIn$ = res);
  }

  logout() {
    this.authService.logout();
  }

  ngAfterViewInit() {
    var offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'));
      offcanvasElementList.map(function(offcanvasEl) {
      return new bootstrap.Offcanvas(offcanvasEl);
    });
  }

  isScrolled = false;

    @HostListener("window:scroll")
    scrollEvent() {
    window.scrollY >= 80 ? (this.isScrolled = true) : (this.isScrolled = false);
}

}
