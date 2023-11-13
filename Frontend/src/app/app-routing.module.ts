import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { TokenGuard } from './guards/token.guard';
import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { AdminAddAccountComponent } from './components/admin-add-account/admin-add-account.component';
import { AdvertisementDetailsComponent } from './components/advertisement-details/advertisement-details.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MessageComponent } from './components/message/message.component';
import { NewMessageComponent } from './components/message/new-message/new-message.component';
import { TutorAdvertisementComponent } from './components/tutor-advertisement/tutor-advertisement.component';

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
  { path: 'addOffer', component: AddOfferComponent, canActivate: [TokenGuard] },
  {
    path: 'addOffer/:id',
    component: AddOfferComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'addAccount',
    component: AdminAddAccountComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'orderHistory',
    component: OrderHistoryComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'advertisementDetails/:id',
    component: AdvertisementDetailsComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'message',
    component: MessageComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'newMessage',
    canActivate: [TokenGuard],
    component: NewMessageComponent,
  },
  {
    path: 'tutorAdvertisement',
    canActivate: [TokenGuard],
    component: TutorAdvertisementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
