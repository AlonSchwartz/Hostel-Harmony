import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
//import { CalendarEvent } from 'calendar-utils';
import { CalendarEvent } from 'angular-calendar';
import {  ChangeDetectionStrategy } from '@angular/core';
import {  CalendarMonthViewDay } from 'angular-calendar';
import { isSameMonth, isSameDay } from 'ngx-bootstrap/chronos/utils/date-getters';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  ngOnInit() {
  }
  
 date = new Date();

  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'An event',
    }
  ];

  activeDayIsOpen: boolean;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void 
  {
    if (isSameMonth(date, this.date)) {
      if (
        (isSameDay(this.date, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) 
      {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.date = date;
      }
    }
  
  
  }
}
