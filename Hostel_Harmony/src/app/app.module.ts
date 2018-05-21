import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NameSelectService } from './services/nameSelect/name-select.service';
import { CalendarModule } from 'angular-calendar';
import { BsDropdownModule } from 'ngx-bootstrap';
import { CanActivateRouteGuard } from './services/auth/can-activate-route.guard';
import { AppRoutingModule, routes } from './app.router';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { CalendarComponent } from './menu/calendar/calendar.component';
import { AddResidentComponent } from './add-resident/add-resident.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EventComponent } from './event/event.component';
import { OwlDateTimeModule,OwlNativeDateTimeModule ,OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { TestingComponent } from './testing/testing.component';
import { UserService } from './services/user/user.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './services/auth/auth.service';
import { HttpModule } from '@angular/http';
import { environment } from '../environments/environment';
import { ColorPickerModule } from 'ngx-color-picker';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/he';
import { EvaluationFormComponent } from './menu/evaluation-form/evaluation-form.component';
import { ViewComponent } from './menu/view/view.component';
import { FilesComponent } from './menu/files/files.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    CalendarComponent,
    AddResidentComponent,
    AddStaffComponent,
    EventComponent,
    TestingComponent,
    EvaluationFormComponent,
    ViewComponent,
    FilesComponent
  ],
  imports: [BrowserModule,FormsModule,HttpModule,
    MatSelectModule,
    ColorPickerModule,
    OwlDateTimeModule,
    MatCheckboxModule,
    OwlNativeDateTimeModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot(routes),
    CalendarModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [
    NameSelectService,
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'il'},
    UserService,
    AuthService,
    CalendarComponent,
    CanActivateRouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }



