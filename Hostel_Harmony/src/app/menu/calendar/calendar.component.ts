import { Component, OnInit,Input, ViewChild, TemplateRef } from '@angular/core';
//import { CalendarEvent } from 'calendar-utils';
import { CalendarEvent, CalendarEventTitleFormatter ,CalendarDateFormatter,DAYS_OF_WEEK} from 'angular-calendar';
import {  ChangeDetectionStrategy, OnChanges, SimpleChange } from '@angular/core';
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
import {NameSelectService} from '../../services/nameSelect/name-select.service';
import { staff } from '../../models/staff.model';
import { resident } from '../../models/resident.model';

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

export class CalendarComponent implements OnInit,OnChanges {
  
  constructor(private nameSel: NameSelectService){
    // console.log(this.events);
  }
  locale: string = 'he';
  weekStartsOn: number = DAYS_OF_WEEK.SUNDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  refresh: Subject<any> = new Subject();

  @Input()//for getting name wanted
  name:string;
  selected:staff|resident;
  rcvId:string;
  inpEve:CalEvent=new CalEvent({date:'',start:'',end:''},
  false, 
  '',
  '',
  '' 
);

inpEve1:CalEvent=new CalEvent(
  {date:'2018-05-30T21:00:00.000Z',start:'2018-05-30T22:00:00.000Z',end:'2018-05-30T22:00:00.000Z'},
  false, 
  'General-2',
  'Someting to do',
  'Elchanan' 
);

ngOnInit() {
  this.fixdEvent();
  this.updateCalendarEvents();
  this.conflictEvent();
  console.log(new Date(this.inpEve.settime.start))
}

ngOnChanges(changes:{[propKey:string]:SimpleChange}){
  for(let na in changes){
    let rec=changes[na];
    let temp=JSON.stringify(rec.currentValue);
    if(!rec.isFirstChange()){
      this.getUserSelected();
    }
  }
}
/**Fixed!!*/
public getUserSelected(){
  this.nameSel.cm.subscribe(selected => this.selected = selected);
  this.addEventToCal(this.selected.events);
  console.log(this.selected)
  this.inpEve = this.selected.events[0];
  console.log(this.inpEve)

}
view: string ='week'
viewDate: Date = new Date();
events: CalendarEvent[] = [
  {
    start: new Date(),
    title: 'test event',
  },
  {
    start: new Date(this.inpEve1.settime.start),
    end:new Date(this.inpEve1.settime.end),
    title: this.inpEve1.activity,
  },
];
//for permnent events
recurringEvents: RecurringEvent[] = [
{
  title: 'Recurs on the 5th of each month',
  rrule: {
  freq: RRule.WEEKLY,
  byweekday: [RRule.MO],
  },},
  {	  title: 'Recurs works? Just a test.',
  rrule: {
  freq: RRule.WEEKLY,
  byweekday: [RRule.SU],
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
  
backToWeekView() {
  this.view = 'week';
}
  
addEventToCal(eve:CalEvent[]): void {
  for(let sel of eve){
      this.events.push({
        title: 'database test',
        //date: new Date(sel.settime.start),
        start: new Date(sel.settime.start),
        end:new Date(sel.settime.end),
      });
    this.refresh.next();
  }
}
  
conflictEvent(): void {
	console.log("inFixedEve");
  if(this.events[0].start.getHours === this.events[3].start.getHours)
  {
		// if(confirm( "כבר יש לך פגישה בשעה "+ this.events[0].start.toLocaleTimeString() )) 
		// {
		// 	console.log("אירוע נשמר")
		// }
		// else {
		// 	console.log("אירוע נמחק")
 		// }
	}
};
fixdEvent(): void {}
chengeCal(): void{}

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

