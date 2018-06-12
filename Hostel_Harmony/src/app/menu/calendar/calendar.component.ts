import { Component, OnInit,Input, ViewChild, TemplateRef } from '@angular/core';
//import { CalendarEvent } from 'calendar-utils';
import { CalendarEvent, CalendarEventTitleFormatter ,CalendarDateFormatter,DAYS_OF_WEEK} from 'angular-calendar';
import {  ChangeDetectionStrategy, OnChanges, SimpleChange } from '@angular/core';
import {  CalendarMonthViewDay } from 'angular-calendar';
import { isSameMonth, isSameDay } from 'ngx-bootstrap/chronos/utils/date-getters';
import { CustomEventTitleFormatter } from '../provider/custom-event-title-formatter.provider';
import { CustomDateFormatter } from '../provider/custom-date-formatter.provider';
import { EventComponent } from '../../event/event.component';
import {CalEvent, CALtest} from '../../models/event.model';
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
  inpEve:CalEvent=new CalEvent({start:'',end:''},
  false, 
  '',
  '',
  '' 
);
date: Date = new Date();
inpEve1:CALtest= {start: this.date , end: this.date, title: "General-2", issuer: "Elchanan", activity:"General-2", describe: "Something to do"} as CALtest ;

// new CALtest(
//   {start:'2018-05-30T22:00:00.000Z',end:'2018-05-30T22:00:00.000Z'},
//   false, 
//   'General-2',
//   'Someting to do',
//   'Elchanan' 
// );

ngOnInit() {
  this.fixdEvent();
  this.updateCalendarEvents();
  // console.log(new Date(this.inpEve.settime.start))
}
/**allow page to wait until a person is passed to calendar, only then will the function run */
ngOnChanges(changes:{[propKey:string]:SimpleChange}){
  for(let na in changes){
    let rec=changes[na];
    let temp=JSON.stringify(rec.currentValue);
    if(!rec.isFirstChange()){
      this.getUserSelected();
      this.changeView(this.selected);
    }
  }
}
/**Fixed!!*/
public getUserSelected(){
  //this.events=[];//empty arrey of current user, need to keep reaccuring events(from database!)
  this.nameSel.cm.subscribe(selected => this.selected = selected);
  if(this.selected==null){
    alert('no user entered')
  }
  // this.addEventToCal(this.selected.events);
}
bevents: CalendarEvent[] = [];
allEvents: CalendarEvent[] = [];
view: string ='week'
viewDate: Date = new Date();
events: CalendarEvent[] = [
  {
    start: new Date(),
    title: 'test event',
  },
  {
    start: new Date(this.inpEve1.start),
    end:new Date(this.inpEve1.end),
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
    this.bevents = this.events;
    this.events = [];
  
    console.log(this.bevents)
    console.log(this.events);
    this.recurringEvents.forEach(event => {
      const rule: RRule = new RRule(
        Object.assign({}, event.rrule, {
          dtstart: startOfPeriod[this.view](this.viewDate),
          until: endOfPeriod[this.view](this.viewDate)
        })
      );
      
      console.log(this.recurringEvents)
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
  
  addEventToCal(eve:CALtest[]): void {
    for(let sel of eve){
      this.events.push({
        title: 'database test',
        start: new Date(sel.start),
        end:new Date(sel.end),
      });
      this.refresh.next();
    }
  }
  
  conflictEvent(): void {
    console.log("inFixedEve");
    // if(this.events[0].start.getHours === this.events[3].start.getHours)
    //{
    // if(confirm( "כבר יש לך פגישה בשעה "+ this.events[0].start.toLocaleTimeString() )) 
    // {
    // 	console.log("אירוע נשמר")
    // }
    // else {
    // 	console.log("אירוע נמחק")
    // }
    //}
  };
  
  
  // *** PLEASE NOTE *** this method is working, but isn't done yet!
  changeView(per: resident|staff){
    this.nameSel.cm.subscribe(selected => this.selected = selected);
    //   console.log("====Before changes====")
    //   console.log(this.events);
    //   console.log("====After changes====")
    //   //this.events[0].title = per.events[0].activity;
    // //this.events.push(this.selected.events[0]);
    // //this.events[0].title = this.selected.events[0].describe;
    // console.log(per.events)
    // console.log(this.selected)
    // this.events = this.selected.events;
    // console.log("=========");
    // var start = new Date(this.selected.events[0].start);
    // var end = new Date(this.selected.events[0].end);
    // console.log(start);
    // console.log(start.getDate())
    // console.log(start.valueOf())
    console.log(this.selected);
    let d = new Date();////2
    // console.log(d)
    let i = 0;
    
    if (this.selected.events.length == 0){
      this.events = [];
    }
    else {
      this.events = this.selected.events;
      console.log(this.events.length)
      for (i=0; i<this.events.length ; i++)
      {
        if (this.events[i].start == null || this.events[i].end == null){
          console.log("");
        }
        this.events[i].start = new Date(this.events[i].start);///2
        //console.log(this.selected.events[0].start);
        this.events[i].end = new Date(this.events[i].end);///2
        this.events[i].title = this.selected.events[i].describe;/////2
        //console.log(this.selected[i].events);
        //this.events[0].start = d;
        //this.events[0].end = d;
        //console.log(this.events);
      }
    }
    this.updateCalendarEvents();
    console.log(this.bevents);
    let j =0;
    for (j=0; j<this.bevents.length;j++){
    this.events.push(this.bevents[j]);
    console.log(this.bevents[j])
    }
    console.log("---------")
    console.log(this.events)
    this.allEvents = this.events;
    this.refresh.next();
    
    
  }
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

