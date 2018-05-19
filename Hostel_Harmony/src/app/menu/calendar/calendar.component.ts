import { Component, OnInit,Input, ViewChild, TemplateRef } from '@angular/core';
//import { CalendarEvent } from 'calendar-utils';
import { CalendarEvent, CalendarEventTitleFormatter ,CalendarDateFormatter,DAYS_OF_WEEK} from 'angular-calendar';
import {  ChangeDetectionStrategy } from '@angular/core';
import {  CalendarMonthViewDay } from 'angular-calendar';
import { isSameMonth, isSameDay } from 'ngx-bootstrap/chronos/utils/date-getters';
import { CustomEventTitleFormatter } from '../provider/custom-event-title-formatter.provider';
import { CustomDateFormatter } from '../provider/custom-date-formatter.provider.ts';

import { EventComponent } from '../../event/event.component';
import {Event} from '../../models/event.model';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    },
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarComponent implements OnInit {
  constructor( ){}
  @Input()//for getting name wanted
  name:string;

  ngOnInit() {
  }
  view: string ='week'
  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'test event',
    }
  ];
  locale: string = 'he';
 

  weekStartsOn: number = DAYS_OF_WEEK.SUNDAY;

<<<<<<< HEAD:Hostel_Harmony/src/app/calendar/calendar.component.ts
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
=======
  
  addEvent(eve: Event){

    alert("I'm in calendar and i got your event!");
    console.log(eve);
    console.log("----Details----");
    console.log("activity = " + eve.activity);
    console.log("asign = " + eve.asign);
    console.log("describe = " + eve.describe);
    console.log("settime = ");
    console.log(eve.settime);
  }
/*
  backToWeekView() {
   this.view = 'week';
  }
  */
>>>>>>> 4c582253160f3002fb84efa13367f0c523facb1d:Hostel_Harmony/src/app/menu/calendar/calendar.component.ts
}
