import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel } from 'src/app/models/register.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(data: RegisterModel): Observable<RegisterModel> {
    console.log(data);
    return this.http.post<RegisterModel>(
      'http://www.localhost:8080/api/auth/register',
      data
    );
  }

  registerEmployee(data: RegisterModel): Observable<RegisterModel> {
    return this.http.post<RegisterModel>(
      'http://www.localhost:8080/api/users/user/saveEmployee',
      data
    );
  }
}
