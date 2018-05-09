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
import { UserService } from './services/user/user.service';
import { TestingComponent } from './testing/testing.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    FormComponent,
    CalendarComponent,
    AddResidentComponent,
    AddStaffComponent,
    TestingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [
    UserService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
