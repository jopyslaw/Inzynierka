import { AdvertisementModel } from '../../shared/models/advertisement.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementService {
  constructor(private http: HttpClient) {}

  addAdvertisement(data: any): Observable<AdvertisementModel> {
    return this.http.post<AdvertisementModel>(
      'http://www.localhost:3000/api/advertisement/add',
      data
    );
  }

  getAllAdvertisements(userId: string): Observable<AdvertisementModel[]> {
    return this.http.get<AdvertisementModel[]>(
      'http://www.localhost:3000/api/advertisement/getAll/' + userId
    );
  }

  getAllAvailableAdvertisements(): Observable<AdvertisementModel[]> {
    return this.http.get<AdvertisementModel[]>(
      'http://www.localhost:3000/api/advertisement/getAll'
    );
  }

  getAdvertisementById(
    advertisementId: string
  ): Observable<AdvertisementModel> {
    console.log(advertisementId);
    return this.http.get<AdvertisementModel>(
      'http://www.localhost:3000/api/advertisement/get/' + advertisementId
    );
  }

  getAllAvailableAdvertisementsForTutor(
    userId: string
  ): Observable<AdvertisementModel[]> {
    return this.http.get<AdvertisementModel[]>(
      'http://www.localhost:3000/api/advertisement/getTutorAdvertisements/' +
        userId
    );
  }

  deleteAdvertisement(advertisementId: string): Observable<void> {
    return this.http.delete<void>(
      'http://www.localhost:3000/api/advertisement/remove/' + advertisementId
    );
  }
}
