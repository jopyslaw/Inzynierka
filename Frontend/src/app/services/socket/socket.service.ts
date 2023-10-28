import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private readonly url = 'http://localhost:3000/notifications';
  private socket: Socket;

  constructor(private token: TokenService) {
    this.socket = io(this.url, {
      query: {
        userId: this.token.getUserId(),
      },
    });
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  on(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
