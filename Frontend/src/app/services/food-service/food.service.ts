import { foodModel } from '../../shared/models/food.model';
import { addFoodModel } from '../../shared/models/addFood.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  addFood(data: addFoodModel): Observable<addFoodModel> {
    return this.http.post<addFoodModel>(
      'http://www.localhost:8080/api/food/addfood',
      data
    );
  }

  addFoodImg(data: File): Observable<any> {
    let formParams = new FormData();
    formParams.append('image', data);
    const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
    return this.http.post<any>(
      'http://www.localhost:8080/api/food/addfoodimg',
      formParams
    );
  }

  getFood(): Observable<foodModel[]> {
    return this.http.get<foodModel[]>(
      'http://www.localhost:8080/api/food/food/store'
    );
  }

  getFoodImg(id: string): Observable<any> {
    return this.http.get(`http://www.localhost:8080/api/food/foodimg/${id}`);
  }
}
