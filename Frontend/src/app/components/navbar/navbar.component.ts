import { TokenService } from '../../services/token/token.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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

  constructor(private token: TokenService, private router: Router) {}

  ngOnInit(): void {
    this.subscription.add(
      this.token.isLogged.subscribe((log: boolean) => {
        this.isLogged = log;
        if (this.token.getRole()) {
          this.role = this.token.getRole() ?? '';
        }
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
