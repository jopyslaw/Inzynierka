import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient, private token: TokenService) {}

  sendMessage(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/message/send', data);
  }

  getMessageCounter(token: string): Observable<any> {
    return this.http.get('http://localhost:3000/api/message/counter/' + token);
  }

  getAllContacts(userId: string): Observable<any> {
    return this.http.get(
      'http://localhost:3000/api/message/contacts/' + userId
    );
  }

  getUsersForTutors(): Observable<any> {
    return this.http.get(
      'http://localhost:3000/api/user/getUsersForTutors/' +
        this.token.getUserId()
    );
  }

  getTutorsForUsers(): Observable<any> {
    return this.http.get(
      'http://localhost:3000/api/user/getTutorsForUsers/' +
        this.token.getUserId()
    );
  }

  getMessages(data: any): Observable<any> {
    return this.http.get(
      'http://localhost:3000/api/message/messages/' +
        data.senderId +
        '/' +
        data.reciverId
    );
  }

  setStateToReaded(data: {
    senderId: string;
    reciverId: string;
  }): Observable<any> {
    return this.http.post('http://localhost:3000/api/message/readed', data);
  }
}
