import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { IUser } from '../../Models/auth/i-user';
import { IAuthData } from '../../Models/auth/i-auth-data';

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
myUser!: IAuthData;

ngOnInit(){

  this.authService.user$.subscribe(res => {

    if(res) this.myUser = res;

  })
  this.authService.isLoggedIn$.subscribe(res => this.isLoggedIn$ = res);

}

logout(){

  this.authService.logout();

}

}
