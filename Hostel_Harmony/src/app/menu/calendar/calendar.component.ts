import { Component, OnInit,Input } from '@angular/core';
import { CalendarEvent, CalendarEventTitleFormatter ,CalendarDateFormatter,DAYS_OF_WEEK} from 'angular-calendar';
import {  ChangeDetectionStrategy, OnChanges, SimpleChange } from '@angular/core';
import { CustomEventTitleFormatter } from '../provider/custom-event-title-formatter.provider';
import { CustomDateFormatter } from '../provider/custom-date-formatter.provider';
import {CalEvent, CALtest} from '../../models/event.model';
import { startOfDay, endOfDay,getMonth,startOfMonth,startOfWeek,endOfMonth,endOfWeek} from 'date-fns';
import { Subject } from 'rxjs';
import { RRule } from 'rrule';
import {NameSelectService} from '../../services/nameSelect/name-select.service';
import { staff } from '../../models/staff.model';
import { resident } from '../../models/resident.model';
import {MatDialog, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig} from '@angular/material';
import { dialogPopup } from './dialogPopup.component';
import { UserService } from '../../services/user/user.service';

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
  
  constructor(private nameSel: NameSelectService,public dialog: MatDialog, private userService: UserService ){
    this.userService.getrecurringEvents().then(()=>{ 
      this.getRecEvents();
      this.refresh.next();
      this.updateCalendarEvents()
    });  

    
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
    start: new Date(2017, 5, 10),
    title: 'test event',
  },
  
];

//for permanent events
recurringEvents: RecurringEvent[];


ngOnInit() {

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

getRecEvents(){
  
  this.recurringEvents = this.userService.recurringEvents;

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
  
  if (this.recurringEvents != null){
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


/** Change the view according to the selected person */
changeView(per: resident|staff){
  this.nameSel.cm.subscribe(selected => this.selected = selected);
  
  if (this.selected == null){
    this.updateCalendarEvents()
    return;
  }    
  
  let d = new Date();
  
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
      this.events[i].start = new Date(this.events[i].start);
      this.events[i].end = new Date(this.events[i].end);
      this.events[i].title = this.selected.events[i].describe;
      if (this.events[i].color != null){ // delete this line after changing persons on Database
        
        this.events[i].color.secondary = this.selected.events[i].activity.color;
        this.events[i].color.primary = this.selected.events[i].activity.color;
      }
    }
  }
  this.updateCalendarEvents();
  let j =0;
  for (j=0; j<this.bevents.length;j++){
    this.events.push(this.bevents[j]);
  }
  
  this.allEvents = this.events;
  this.refresh.next();
}

/** Shows a popup with event details */
eventClicked({ event }: { event: CALtest }): void {
  
  
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;


  if (event.activity != null){ // regular event
    dialogConfig.data = {
      
      header: "אירוע:",
      title: event.title,
      start: event.start,
      end: event.end,
      type: event.activity,
      issuer: event.issuer,
      asign: event.asign,
      recEvent: false
    }
  }

  else{ // It's a recurring event
    dialogConfig.data = {
      header: "אירוע",
      title: event.title,
      start: event.start,
      color: event.color,
      recEvent: true,
      until: event.end,
      id: event.id
      
    }

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

