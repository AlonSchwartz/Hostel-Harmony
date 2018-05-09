import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { MenuComponent } from "./menu/menu.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { EventComponent } from "./event/event.component";
import { AddResidentComponent} from "./add-resident/add-resident.component";
import { AddStaffComponent } from "./add-staff/add-staff.component"

export const appRoutes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "menu", component: MenuComponent },
    { path: "calendar", component: CalendarComponent },
    { path: "event", component: EventComponent },
    { path: "add-staff", component: AddStaffComponent },
    { path: "add-resident", component: AddResidentComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];