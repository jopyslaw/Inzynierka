import { LocalStorageService } from '../local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isLogged: BehaviorSubject<boolean> = new BehaviorSubject(
    !!this.store.get('userId')
  );

  constructor(private store: LocalStorageService) {}

  removeToken(): void {
    this.store.remove('userId');
    this.store.remove('basket');
    this.store.remove('role');
    this.isLogged.next(false);
  }
}
