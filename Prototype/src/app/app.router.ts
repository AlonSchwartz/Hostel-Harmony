import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { MenuComponent } from "./menu/menu.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { FormComponent } from "./form/form.component";

export const appRoutes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "menu", component: MenuComponent },
    { path: "calendar", component: CalendarComponent },
    { path: "form", component: FormComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];