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
}
