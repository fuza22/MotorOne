import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPassword } from '../Models/auth/i-password';
import { IAuthData } from '../Models/auth/i-auth-data';

@Injectable({
  providedIn: 'root'
})
export class ApiBeService {

  constructor(private http:HttpClient) { }

  imageUpload(userId: number, file:File):Observable<any>{

    let formData = new FormData();
    formData.append('upload', file);
    return this.http.patch<any>(`${environment.backendUrl}/user/${userId}/upload`, formData)

  }

  updatePassword(userId: number, password: IPassword): Observable<IPassword> {
    const updatePasswordUrl = `${environment.backendUrl}/user/edit/password/${userId}`;
    return this.http.patch<IPassword>(updatePasswordUrl, password);
  }


}
