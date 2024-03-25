import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { IAuthData } from '../../Models/auth/i-auth-data';
import { IUser } from '../../Models/auth/i-user';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  myUser!: IUser;


  constructor(authSvc: AuthService) {}

  //ngOnInit(){
//
  //  this.loggedIn();
//
  //}

  //loggedIn(){
//
  // const user:string|null = localStorage.getItem('accessData');
//
  //  if(!user) return alert("Not logged in")
//
  //  const data: IAuthData = JSON.parse(user)
  //  this.myUser = data.user;
//
  //}
}

