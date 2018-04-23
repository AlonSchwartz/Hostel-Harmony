import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router"

import { appRoutes } from './app.router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { FormComponent } from './form/form.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AddResidentComponent } from './add-resident/add-resident.component';
import { AddStaffComponent } from './add-staff/add-staff.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    FormComponent,
    CalendarComponent,
    AddResidentComponent,
    AddStaffComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
