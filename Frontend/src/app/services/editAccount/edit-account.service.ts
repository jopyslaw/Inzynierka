import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditAccountService {
  url = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) {}

  getAccountInfo(userId: string): Observable<any> {
    return this.http.get(this.url + '/data/' + userId);
  }

  updateAccountInfo(data: any): Observable<any> {
    return this.http.post(this.url + '/create', data);
  }

  updatePassword(userId: string, password: string): Observable<any> {
    return this.http.post(this.url + '/password/' + userId, { password });
  }
}
