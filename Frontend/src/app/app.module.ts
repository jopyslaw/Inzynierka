import { TokenInterceptor } from './interceptors/token.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { MenuComponent } from './components/menu/menu.component';
import { OfferItemComponent } from './components/menu/offer-item/offer-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { AdminAddAccountComponent } from './components/admin-add-account/admin-add-account.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorHandlingInterceptor } from './interceptors/error-handling.interceptor';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PosterDetailsComponent } from './components/poster-details/poster-details.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TokenService } from './services/token/token.service';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationItemComponent } from './components/notifications/notification-item/notification-item.component';
import { MessageComponent } from './components/message/message.component';
import { NewMessageComponent } from './components/message/new-message/new-message.component';
import { ContactItemComponent } from './components/message/contact-item/contact-item.component';
import { TutorAdvertisementComponent } from './components/tutor-advertisement/tutor-advertisement.component';
import { ItemComponent } from './components/tutor-advertisement/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    NavbarComponent,
    LoginPageComponent,
    RegisterPageComponent,
    EditAccountComponent,
    MenuComponent,
    OfferItemComponent,
    AddOfferComponent,
    AdminAddAccountComponent,
    OrderHistoryComponent,
    ErrorDialogComponent,
    PosterDetailsComponent,
    ConfirmDialogComponent,
    NotificationsComponent,
    NotificationItemComponent,
    MessageComponent,
    NewMessageComponent,
    ContactItemComponent,
    TutorAdvertisementComponent,
    ItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatRadioModule,
    MatIconModule,
    MatFormFieldModule,
    MatOptionModule,
    FormsModule,
    MatBadgeModule,
    MatDialogModule,
    MatSnackBarModule,
    FullCalendarModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptor,
      multi: true,
    },
    TokenService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
