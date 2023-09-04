import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel } from 'src/app/shared/models/register.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(data: RegisterModel): Observable<RegisterModel> {
    return this.http.post<RegisterModel>(
      'http://www.localhost:3000/api/user/create',
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
