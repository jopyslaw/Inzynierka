import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  LoginModel,
  LoginModelResponse,
} from '../../shared/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(loginData: LoginModel): Observable<LoginModelResponse> {
    const headers = new HttpHeaders({ Accept: '*/*' });
    return this.http.post<LoginModelResponse>(
      'http://localhost:3000/api/user/auth',
      loginData,
      {
        headers: headers,
      }
    );
  }
}
