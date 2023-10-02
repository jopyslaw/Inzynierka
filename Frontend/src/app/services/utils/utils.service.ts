import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private readonly url = 'http://localhost:3000/api/utils/currentDate';

  constructor(private http: HttpClient) {}

  getCurrentDate(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
