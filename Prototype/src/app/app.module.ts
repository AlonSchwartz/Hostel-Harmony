import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { BsDropdownModule } from 'ngx-bootstrap';

import { appRoutes } from './app.router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { FormComponent } from './form/form.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AddResidentComponent } from './add-resident/add-resident.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { SingleDayColComponent } from './single-day-col/single-day-col.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    FormComponent,
    CalendarComponent,
    AddResidentComponent,
    AddStaffComponent,
    SingleDayColComponent
    
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    CalendarModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



