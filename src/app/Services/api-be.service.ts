import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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

}
