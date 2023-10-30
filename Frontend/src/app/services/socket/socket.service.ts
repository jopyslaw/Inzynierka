import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { TokenService } from '../token/token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;

  constructor(private token: TokenService) {}

  connect(url: string): void {
    this.socket = io(url, {
      query: {
        userId: this.token.getUserId(),
      },
    });
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  on(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });
    });
  }

  disconnect() {
    this.socket.disconnect();
  }
}
