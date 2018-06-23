import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { MenuComponent } from "./menu/menu.component";
import { CalendarComponent } from "./menu/calendar/calendar.component";
import { EventComponent } from "./event/event.component";
import { AddResidentComponent} from "./add-resident/add-resident.component";
import { AddStaffComponent } from "./add-staff/add-staff.component"
import { CanActivateRouteGuard } from './services/auth/can-activate-route.guard';


export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "menu",canActivate: [CanActivateRouteGuard], component: MenuComponent, children:
        [
        { path: '', component: CalendarComponent}
        ]
    },
    { path: "event",canActivate: [CanActivateRouteGuard],component: EventComponent},
    { path: "add-staff",canActivate: [CanActivateRouteGuard], component: AddStaffComponent},
    { path: "add-resident",canActivate: [CanActivateRouteGuard], component: AddResidentComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }