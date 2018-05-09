import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NameSelectService } from './service/New folder/name-select.service';

import { appRoutes } from './app.router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AddResidentComponent } from './add-resident/add-resident.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { EventComponent } from './event/event.component';
import { OwlDateTimeModule,OwlNativeDateTimeModule ,OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { TestingComponent } from './testing/testing.component';


@NgModule({
  declarations: [
    
    AppComponent,
    LoginComponent,
    MenuComponent,
    CalendarComponent,
    AddResidentComponent,
    AddStaffComponent,
    EventComponent,
    TestingComponent
  ],
  imports: [
    MatSelectModule,
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
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    NameSelectService,
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'il'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
