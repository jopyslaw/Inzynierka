import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginModel, LoginModelResponse } from '../../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  sendData(loginData: LoginModel): Observable<LoginModelResponse> {
    const headers = new HttpHeaders({ Accept: '*/*' });
    return this.http.post<LoginModelResponse>(
      'http://www.localhost:8080/api/auth/login',
      loginData,
      {
        headers: headers,
      }
    );
  }
}
