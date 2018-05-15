import { Component, OnInit,Input, ViewChild, TemplateRef } from '@angular/core';
//import { CalendarEvent } from 'calendar-utils';
import { CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import {  ChangeDetectionStrategy } from '@angular/core';
import {  CalendarMonthViewDay } from 'angular-calendar';
import { isSameMonth, isSameDay } from 'ngx-bootstrap/chronos/utils/date-getters';
import { CustomEventTitleFormatter } from '../../provider/custom-event-title-formatter.provider';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
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

  
  
}
