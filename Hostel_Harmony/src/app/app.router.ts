import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { MenuComponent } from "./menu/menu.component";
import { CalendarComponent } from "./calendar/calendar.component";
<<<<<<< HEAD:Prototype/src/app/app.router.ts
import { FormComponent } from "./form/form.component";
import { TestingComponent } from "./testing/testing.component";
=======
import { EventComponent } from "./event/event.component";
import { AddResidentComponent} from "./add-resident/add-resident.component";
import { AddStaffComponent } from "./add-staff/add-staff.component"
>>>>>>> 753285128eaf03d2df8f65497e403fbe9f5590e2:Hostel_Harmony/src/app/app.router.ts

export const appRoutes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "menu", component: MenuComponent },
    { path: "calendar", component: CalendarComponent },
<<<<<<< HEAD:Prototype/src/app/app.router.ts
    { path: "form", component: FormComponent },
    { path: "testing", component: TestingComponent },
=======
    { path: "event", component: EventComponent },
    { path: "add-staff", component: AddStaffComponent },
    { path: "add-resident", component: AddResidentComponent },
>>>>>>> 753285128eaf03d2df8f65497e403fbe9f5590e2:Hostel_Harmony/src/app/app.router.ts
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];