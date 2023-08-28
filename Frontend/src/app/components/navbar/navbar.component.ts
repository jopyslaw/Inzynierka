import { BasketService } from './../../services/basket/basket.service';
import { TokenService } from '../../services/token/token.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLogged?: boolean;
  numberOfItemsInBasket?: number;
  subscription: Subscription = new Subscription();
  role = '';

  constructor(
    private token: TokenService,
    private router: Router,
    private basket: BasketService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.token.isLogged.subscribe((log: boolean) => {
        this.isLogged = log;
        if (localStorage.getItem('userId')) {
          this.role = this.localStorage.get('role') ?? '';
        }
      })
    );

    this.subscription.add(
      this.basket.numberOfElements.subscribe((number) => {
        this.numberOfItemsInBasket = number;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logOut(): void {
    this.token.removeToken();
    this.router.navigate(['/']);
  }
}
