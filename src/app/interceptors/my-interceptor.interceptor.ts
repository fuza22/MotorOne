import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthData } from '../Models/auth/i-auth-data';

@Injectable()
export class myInterceptor implements HttpInterceptor{
  intercept(req:HttpRequest<any>, next:HttpHandler):
  Observable<HttpEvent<any>>{

    let stringUser:string|null = localStorage.getItem("accessData");
    if(!stringUser) return next.handle(req)

    let user:IAuthData = JSON.parse(stringUser)
    let newReq = req.clone({
      setHeaders:{
        Authorization: 'Bearer ' + user.accessToken
      }
    })
    return next.handle(newReq);
  }
}
