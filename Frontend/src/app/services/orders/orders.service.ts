import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>('http://www.localhost:8080/api/delivery/store');
  }

  sendOrder(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>(
      'http://www.localhost:8080/api/delivery/newDel',
      data
    );
  }

  changeOrderStatus(data: any): Observable<any> {
    return this.http.get(`http://www.localhost:8080/api/delivery/new/${data}`);
  }

  getUserOrders(data: any): Observable<any> {
    return this.http.get(`http://www.localhost:8080/api/delivery/get/${data}`);
  }
}
