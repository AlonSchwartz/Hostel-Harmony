import { Component, OnInit,Input, ViewChild, TemplateRef } from '@angular/core';
//import { CalendarEvent } from 'calendar-utils';
import { CalendarEvent, CalendarEventTitleFormatter ,CalendarDateFormatter,DAYS_OF_WEEK} from 'angular-calendar';
import {  ChangeDetectionStrategy } from '@angular/core';
import {  CalendarMonthViewDay } from 'angular-calendar';
import { isSameMonth, isSameDay } from 'ngx-bootstrap/chronos/utils/date-getters';
import { CustomEventTitleFormatter } from '../provider/custom-event-title-formatter.provider';
import { CustomDateFormatter } from '../provider/custom-date-formatter.provider';
import { EventComponent } from '../../event/event.component';
import {CalEvent} from '../../models/event.model';
import { startOfDay, endOfDay,getMonth,startOfMonth,startOfWeek,endOfMonth,endOfWeek} from 'date-fns';
import { Subject } from 'rxjs';
import { start } from 'repl';
import { RRule } from 'rrule';






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
  constructor(){
    console.log(this.events);
  }
  @Input()//for getting name wanted
  name:string;
  inpEve:CalEvent=new CalEvent({date:'2018-05-30T21:00:00.000Z',start:'2018-05-30T23:00:00.000Z',end:'2018-05-30T24:00:00.000Z'},
  false, 
  'General',
  'Someting to do',
  'Elchanan' );
  inpEve1:CalEvent=new CalEvent(
    {date:'2018-05-30T21:00:00.000Z',start:'2018-05-30T22:00:00.000Z',end:'2018-05-30T22:00:00.000Z'},
    false, 
    'General-2',
    'Someting to do',
    'Elchanan' );
  inpEve2:CalEvent=new CalEvent(
    {date:'2018-05-30T21:00:00.000Z',start:'2018-05-30T22:00:00.000Z',end:'2018-05-30T22:00:00.000Z'},
    false, 
    'General-3',
    'Someting to do',
    'Elchanan' );
  ngOnInit() {
	  //this.compareEvents();
	  this.fixdEvent();
	  this.updateCalendarEvents();
    //console.log(new Date(this.inpEve.settime.start))
  }
  view: string ='week'
  viewDate: Date = new Date();
  events: CalendarEvent[] = [
     {
		start: new Date(this.inpEve.settime.start),
		end:new Date(this.inpEve.settime.end),
		title: this.inpEve.activity,

     },
    {
      start: new Date(),
      title: 'test event',
    },
    {
      start: new Date(this.inpEve1.settime.start),
      end:new Date(this.inpEve1.settime.end),
      title: this.inpEve1.activity,
	 },
	 {
      start: new Date(this.inpEve2.settime.start),
      end:new Date(this.inpEve2.settime.end),
      title: this.inpEve2.activity,
    },
  ];
  recurringEvents: RecurringEvent[] = [
	{
	  title: 'Recurs on the 5th of each month',
	  rrule: {
		freq: RRule.WEEKLY,
		byweekday: [RRule.MO]
	  }
	}];
  //add a check if event exists
	updateCalendarEvents(): void {
		//this.events = [];
  
		const startOfPeriod: any = {
		  month: startOfMonth,
		  week: startOfWeek,
		  day: startOfDay
		};
  
		const endOfPeriod: any = {
		  month: endOfMonth,
		  week: endOfWeek,
		  day: endOfDay
		};
  
		this.recurringEvents.forEach(event => {
		  const rule: RRule = new RRule(
			 Object.assign({}, event.rrule, {
				dtstart: startOfPeriod[this.view](this.viewDate),
				until: endOfPeriod[this.view](this.viewDate)
			 })
		  );
  
		  rule.all().forEach(date => {
			 this.events.push(
				Object.assign({}, event, {
				  start: new Date(date)
				})
			 );
		  });
		});
	 }





  locale: string = 'he';
  weekStartsOn: number = DAYS_OF_WEEK.SUNDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  
  addEvent(eve: CalEvent){
    console.log(this.events);
    alert("I'm in calendar and i got your event!");
    console.log(eve);
    console.log("----Details----");
    console.log("activity = " + eve.activity);
    console.log("asign = " + eve.asign);
    console.log("describe = " + eve.describe);
    console.log("settime = ");
    console.log(eve.settime);
  }

  backToWeekView() {
   this.view = 'week';
  }
  refresh: Subject<any> = new Subject();
  // addEvent(): void {
  //   this.events.push({
  //     title: 'New event',
  //     start: startOfDay(new Date()),
  //     end: endOfDay(new Date()),
  //     draggable: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     }
  //   });
  //   this.refresh.next();
  // }
  
// compareEvents(): void {
// 	console.log("inFixedEve");
// 	if(this.events[0].start.getHours === this.events[3].start.getHours)
// 		alert(" כבר יש לך פגישה בשעה זו\nבבקשה קבע פגישה במועד אחר");
// 	else
// 		alert("no!!");
// };
fixdEvent(): void{

}

}


interface RecurringEvent {
	title: string;
	rrule?: {
	  freq: RRule.Frequency;
	  bymonth?: number;
	  bymonthday?: number;
	  byweekday?: RRule.Weekday[];
	};
 }