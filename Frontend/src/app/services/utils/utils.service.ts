import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentDate } from 'src/app/shared/models/currentDateUtils.model';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private readonly url = 'http://localhost:3000/api/utils/currentDate';

  constructor(private http: HttpClient) {}

  getCurrentDate(): Observable<CurrentDate> {
    return this.http.get<CurrentDate>(this.url);
  }
}
