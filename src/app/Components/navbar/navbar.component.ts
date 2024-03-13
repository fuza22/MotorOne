import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: '.app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

constructor(

  private authService: AuthService

){}

hide!:boolean;
isLoggedIn$!: boolean;

ngOnInit(){

  this.authService.isLoggedIn$.subscribe(res => this.isLoggedIn$ = res);

}

logout(){

  this.authService.logout();

}

}
