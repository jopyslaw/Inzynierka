import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  getNotificationsForUser(userId: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(
      `${environment.BACKEND_ENDPOINT}notification/${userId}`
    );
  }

  setNotificationToReadedState(notificationId: string): Observable<any> {
    return this.http.post<any>(
      'http://localhost:3000/api/notification/readed',
      { notificationId }
    );
  }
}
