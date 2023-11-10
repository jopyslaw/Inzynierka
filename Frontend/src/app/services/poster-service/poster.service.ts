import { PosterModel } from '../../shared/models/poster.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PosterService {
  constructor(private http: HttpClient) {}

  addPoster(data: any): Observable<PosterModel> {
    return this.http.post<PosterModel>(
      'http://www.localhost:3000/api/poster/add',
      data
    );
  }

  getAllPosters(userId: string): Observable<PosterModel[]> {
    return this.http.get<PosterModel[]>(
      'http://www.localhost:3000/api/poster/getAll/' + userId
    );
  }

  getAllAvailablePosters(): Observable<PosterModel[]> {
    return this.http.get<PosterModel[]>(
      'http://www.localhost:3000/api/poster/getAll'
    );
  }

  getPosterById(posterId: string): Observable<PosterModel> {
    return this.http.get<PosterModel>(
      'http://www.localhost:3000/api/poster/get/' + posterId
    );
  }
}
