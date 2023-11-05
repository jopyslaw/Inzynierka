import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

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

  getAllTutors(): Observable<any> {
    return this.http.get('http://localhost:3000/api/user/getAllTutors');
  }

  getMessages(data: any): Observable<any> {
    return this.http.get(
      'http://localhost:3000/api/message/messages/' +
        data.senderId +
        '/' +
        data.reciverId
    );
  }
}
