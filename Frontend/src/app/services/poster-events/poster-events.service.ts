import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PosterEventsService {
  constructor(private http: HttpClient) {}

  getAllEventsForUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(
      'http://localhost:3000/api/posterEvents/getAll/' + userId
    );
  }

  getAllEventsForPoster(posterId: string): Observable<any[]> {
    return this.http.get<any[]>(
      'http://localhost:3000/api/posterEvents/get/' + posterId
    );
  }

  saveEventToUser(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/reserve/add', data);
  }

  removeEventFromUser(eventId: string): Observable<any> {
    return this.http.delete(
      'http://localhost:3000/api/reserve/remove/' + eventId
    );
  }

  getAllReservedUserEvents(userId: string): Observable<any[]> {
    return this.http.get<any[]>(
      'http://localhost:3000/api/posterEvents/reservedUserEvents/' + userId
    );
  }
}
