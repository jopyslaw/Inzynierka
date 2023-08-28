import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrdersStateComponent } from './components/orders-state/orders-state.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { MenuComponent } from './components/menu/menu.component';
import { BasketComponent } from './components/basket/basket.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { TokenGuard } from './guards/token.guard';
import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { AdminAddAccountComponent } from './components/admin-add-account/admin-add-account.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'edit-account',
    component: EditAccountComponent,
    canActivate: [TokenGuard],
  },
  { path: 'menu', component: MenuComponent, canActivate: [TokenGuard] },
  { path: 'basket', component: BasketComponent, canActivate: [TokenGuard] },
  { path: 'addOffer', component: AddOfferComponent, canActivate: [TokenGuard] },
  {
    path: 'addAccount',
    component: AdminAddAccountComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'ordersStatus',
    component: OrdersStateComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'orderHistory',
    component: OrderHistoryComponent,
    canActivate: [TokenGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
