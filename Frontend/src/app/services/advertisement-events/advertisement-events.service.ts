import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvertisementEvent } from 'src/app/shared/models/advertisementEvent.model';
import { AdvertisementEventsModel } from 'src/app/shared/models/advertisement.model';
import { ReservationModel } from 'src/app/shared/models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementEventsService {
  constructor(private http: HttpClient) {}

  getAllEventsForUser(userId: string): Observable<AdvertisementEvent[]> {
    return this.http.get<any[]>(
      'http://localhost:3000/api/advertisementEvents/getAll/' + userId
    );
  }

  getAllEventsForAdvertisement(
    advertisementId: string
  ): Observable<AdvertisementEvent[]> {
    return this.http.get<AdvertisementEvent[]>(
      'http://localhost:3000/api/advertisementEvents/get/' + advertisementId
    );
  }

  saveEventToUser(data: ReservationModel): Observable<ReservationModel> {
    return this.http.post<ReservationModel>(
      'http://localhost:3000/api/reserve/add',
      data
    );
  }

  removeEventFromUser(eventId: string): Observable<any> {
    return this.http.delete(
      'http://localhost:3000/api/reserve/remove/' + eventId
    );
  }

  getAllReservedUserEvents(
    userId: string
  ): Observable<AdvertisementEventsModel[]> {
    return this.http.get<AdvertisementEventsModel[]>(
      'http://localhost:3000/api/advertisementEvents/reservedUserEvents/' +
        userId
    );
  }
}
