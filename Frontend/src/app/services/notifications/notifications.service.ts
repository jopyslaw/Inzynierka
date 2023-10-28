import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private http: HttpClient) {}

  getNotificationCounter(userId: string): Observable<any> {
    return this.http.get(
      'http://localhost:3000/api/notification/counter/' + userId
    );
  }
}
