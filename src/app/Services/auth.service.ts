import { IAuthData } from '../Models/auth/i-auth-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegister } from '../Models/auth/i-register';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ILoginData } from '../Models/auth/i-login-data';
import { IUser } from '../Models/auth/i-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  backendUrl: string = `${environment.backendUrl}`

  jwtHelper:JwtHelperService = new JwtHelperService()
  authSubject = new BehaviorSubject<IAuthData | null>(null)
  user$: Observable<IAuthData | null> = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map(user => !!user))

  constructor(private http:HttpClient, private router:Router) {

    this.restoreUser()
   }

  signUp(register:IRegister):Observable<IAuthData>{

    return this.http.post<IAuthData>(`${this.backendUrl}/auth/register`, register)

  }

  logIn(logInData:ILoginData):Observable<IAuthData>{

    return this.http.post<IAuthData>(`${this.backendUrl}/auth/login`, logInData)
    .pipe(tap(data =>{
      this.authSubject.next(data);
      localStorage.setItem('accessData', JSON.stringify(data));
      this.autoLogout(data.accessToken)
    }))

  }

  autoLogout(jwt:string){
    const expDate =this.jwtHelper.getTokenExpirationDate(jwt) as Date;
    const expMs = expDate.getTime() - new Date().getTime()


  setTimeout(()=> {
    this.logout()
  }, expMs)
  }


  logout(){
    this.authSubject.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/homepage']);
  }

  restoreUser(){
    const userJson:string|null = localStorage.getItem('accessData');
    if(!userJson) return;

    const accessData:IAuthData = JSON.parse(userJson);
    if(this.jwtHelper.isTokenExpired(accessData.accessToken)) return

    this.autoLogout(accessData.accessToken)
    this.authSubject.next(accessData)
  }

  update(userId: number, userData: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.backendUrl}/user/update/${userId}`, userData)
  }

  getUserById(userId: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.backendUrl}/user/search/${userId}`);
  }

  updateUser(userData:IAuthData):Observable<IAuthData> {

    return this.http.patch<IAuthData>(`${environment.backendUrl}/user/update/${userData.user.id}`, userData.user)
    .pipe(tap(() => {

      this.authSubject.next(userData)
      localStorage.setItem('user', JSON.stringify(userData));

    }));

  }

}
