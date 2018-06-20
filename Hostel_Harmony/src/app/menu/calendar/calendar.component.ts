import { Component, OnInit,Input, ViewChild, TemplateRef } from '@angular/core';
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
import {MatDialog, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig} from '@angular/material';
import { dialogPopup } from './dialogPopup.component';
import { UserService } from '../../services/user/user.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

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
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, 
      useValue: {hasBackdrop: false}
    }
  ]
})

export class CalendarComponent implements OnInit,OnChanges {
  
  constructor(private nameSel: NameSelectService,public dialog: MatDialog ){
  }
  
  // Declarations & Initializations
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
inpEve1:CALtest= {start: this.date , end: this.date, title: "General-2", issuer: "Elchanan", activity:{value:"",viewValue:"",color:""}} as CALtest ;

bevents: CalendarEvent[] = [];
allEvents: CalendarEvent[] = [];
view: string ='week'
viewDate: Date = new Date();
events: CalendarEvent[] = [
  {
    start: new Date(),
    title: 'test event',
  },
  
];

//for permanent events
recurringEvents: RecurringEvent[]=
[
  {
    title: 'Recurs on the 5th of each month',
    rrule: {
      freq: RRule.WEEKLY,
      byweekday: [RRule.TU],
      byhour: 14,
      byminute: 32,
      count: 5,
    },},
    {	  title: 'Recurs works? Just a test.',
    rrule: {
      freq: RRule.WEEKLY,
      byweekday: [RRule.SU],
    }
  }];
  
  ngOnInit() {
    this.updateCalendarEvents();
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
  
  /**Saves the information of selected person*/
  public getUserSelected(){
    this.nameSel.cm.subscribe(selected => this.selected = selected);
    if(this.selected==null){
      alert('no user entered')
    }
  }
  /** Updating the events view according to selected person */
  updateCalendarEvents(): void {
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
  /**Checking for conflict events for same person */
  conflictEvent(event:CALtest,per:staff|resident): boolean {   
    
    let i=0;
    console.log(per);
    for(i=0; i<per.events.length;i++)
    {
      
      per.events[i].start = new Date(per.events[i].start)
      per.events[i].end = new Date(per.events[i].end)
      
      if(event.start.getDay() ==  per.events[i].start.getDay() ) // In case starting days is equals
      {
        // In case the new event coincides with (at least) the starting time of existing event. 
        // In case the new event starting before (or at) starting time of an existing event and ending after the existing event starts.
        // (NewEvent Starting time <= ExisitingEvent Starting time) AND (NewEvent Ending time > ExisitingEvent Starting time)
        if ((event.start.getTime() <= per.events[i].start.getTime()) && event.end.getTime() > per.events[i].start.getTime() ) 
        {
          let answer = confirm("האירוע שהינך מנסה להוסיף חופף עם אירוע אחר. לתאם בכל זאת? \n פרטי האירוע: " + per.events[i].title + "\n משעה: " + per.events[i].start.getHours() + ":" + per.events[i].end.getMinutes() + " עד שעה: " + per.events[i].end.getHours() + ":" + per.events[i].end.getHours())
          if (answer)
          {
            return true;
          }
          else
          {
            return false;
          }
        }
        // In case the new event coincides with (at least) the ending time of existing event.
        // In case the new event starting after (or at) starting time of an existing event and also starting before existing event ends.
        // ((NewEvent Starting time >= ExisitingEvent Starting time) AND (NewEvent Starting time < ExistingEvent Ending time))
        if ((event.start.getTime() >= per.events[i].start.getTime()) && event.start.getTime() < per.events[i].end.getTime() ) 
        {
          let answer = confirm("האירוע שהינך מנסה להוסיף חופף עם אירוע אחר. לתאם בכל זאת? \n פרטי האירוע: " + per.events[i].title + "\n משעה: " + per.events[i].start.getHours() + ":" + per.events[i].end.getMinutes() + " עד שעה: " + per.events[i].end.getHours() + ":" + per.events[i].end.getHours())
          if (answer)
          {
            return true;
          }
          else
          {
            return false;
          }
        }
        
      }
    }
    return true;
  };
  
  
  // *** PLEASE NOTE *** this method is working, but isn't done yet!
  changeView(per: resident|staff){
    this.nameSel.cm.subscribe(selected => this.selected = selected);
    console.log(this.selected)
    
    if (this.selected == null){
      this.updateCalendarEvents()
      return;
    }    
    console.log(this.selected);
    let d = new Date();////2
    
    let i = 0;
    
    if (this.selected.events.length == 0){
      this.events = [];
    }
    else {
      this.events = this.selected.events;
      for (i=0; i<this.events.length ; i++)
      {
        if (this.events[i].start == null || this.events[i].end == null){// TODO: Deleted after changes persons in firebase!
          console.log("this is null");
        }
        this.events[i].start = new Date(this.events[i].start);///2
        this.events[i].end = new Date(this.events[i].end);///2
        this.events[i].title = this.selected.events[i].describe;/////2 
        console.log(this.events[i])
        if (this.events[i].color != null){ // delete this line after changing persons on Database
          
          this.events[i].color.secondary = this.selected.events[i].activity.color;
          this.events[i].color.primary = this.selected.events[i].activity.color;
        }
      }
    }
    this.updateCalendarEvents();
    console.log(this.bevents); //TODO: Delete this line after testing is complete
    let j =0;
    for (j=0; j<this.bevents.length;j++){
      this.events.push(this.bevents[j]);
    }
    this.allEvents = this.events;
    this.refresh.next();
  }
  
  /** Shows a popup with event details */
  eventClicked({ event }: { event: CALtest }): void {
    
    console.log('Event clicked', event);
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      
      header: "אירוע:",
      title: event.title,
      start: event.start,
      end: event.end,
      type: event.activity,
      issuer: event.issuer,
      asign: event.asign
      
    }
    var dialogRef = this.dialog.open(dialogPopup, dialogConfig) 
  };
} 

export interface RecurringEvent {
  title: string;
  describe?: string;
  color?: any;
  rrule?: {
    freq: RRule.Frequency;
    bymonth?: number;
    bymonthday?: number;
    byweekday?: RRule.Weekday[];
    byhour?: number;
    interval?: number,
    dtstart?: Date,
    byminute?: number,
    count?: number, // How many occurrences will be generated overall
    until?: Date
    // RRule arugments can be null. 
  };
  id?:string;
}

