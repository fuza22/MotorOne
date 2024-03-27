import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IDriver } from '../Models/i-driver';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiF1Service {

  f1Url: string = `${environment.apiUrl}`

  constructor(private http:HttpClient, private router:Router) { }

  getAllDrivers(): Observable<IDriver[]>{

    return this.http.get<IDriver[]>(`${this.f1Url}/drivers`);

  }

  getById(id: number): Observable<IDriver[]>{

    return this.http.get<IDriver[]>(`${this.f1Url}/drivers?driver_number=${id}`);

  }

}
