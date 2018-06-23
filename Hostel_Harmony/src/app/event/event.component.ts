/**Sources for this component:
* - https://angular.io/guide/forms for general form
* - https://material.angular.io/components/select for activity select
* - https://material.angular.io/components/checkbox for check if needs assignee
* - https://github.com/DanielYKPan/date-time-picker for date and time pick
*/

import { Component, OnInit } from '@angular/core';
import {CalEvent, CALtest} from '../models/event.model';
import { Router ,RouterEvent} from '@angular/router';
import {NgModel} from '@angular/forms';
import {NameSelectService} from '../services/nameSelect/name-select.service';
import { supportsPassiveEventListeners } from '@angular/cdk/platform';
import { UserService } from '../services/user/user.service';
import { ActivityTypes } from '../models/activity-types.model'
import { staff } from '../models/staff.model';
import { resident } from '../models/resident.model';
import { CalendarEvent } from 'angular-calendar';
import { RecurringEvent } from '../menu/calendar/calendar.component';
import RRule = require('rrule');
import { MatRadioButton }  from '@angular/material/radio' ;

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  moduleId:module.id
})
// TODO: check required fields
export class EventComponent implements OnInit {
  private date: Date = new Date();
  
  private model = {start: this.date, end: this.date, title: "", issuer: "", activity:{value:"", viewValue:"",color:""}, color: {primary: '', secondary: ''}} as CALtest ;
  private submitted: boolean;
  private customActivity:string;
  private newEventTypeSubmited:boolean=false;
  user:staff|resident;
  types :ActivityTypes[]=[];
  
  days:number[]=[];
  months:number[]=[];
  private newEventIndex = -1;
  public edited:boolean=false;
  private firstAddition:boolean=true;
  private test: CalendarEvent;
  test2: CALtest;
  weekdayArr:any[]=[];
  selRecc: string='';
  repeating = ['יומי','שבועי','חודשי',];
  
  
  private recEvent = {title:"", color:"skyblue", rrule:{bymonth:null,bymonthday:null,byhour:null, byweekday:[],until:new Date(),byminute:null ,freq:RRule.YEARLY }} as RecurringEvent;
  
  public min: Date;
  public disabledDateButton: boolean=true;
  
  constructor( private nameSel: NameSelectService, private userService: UserService, public router: Router) {
    this.userService.getEventTypes().then(()=> this.types = this.userService.eventTypes);
    this.submitted = false;
    this.customActivity=null;
    this.weekdayArr=[
      {name:'ראשון', value:RRule.MO, checked:false},
      {name:'שני', value:RRule.TU, checked:false},
      {name:'שלישי', value:RRule.WE, checked:false},
      {name:'רביעי', value:RRule.TH, checked:false},
      {name:'חמישי', value:RRule.FR, checked:false},
      {name:'שישי', value:RRule.SA, checked:false},
      {name:'שבת', value:RRule.SU, checked:false}
    ];
    this.monthNday();
  }
  
  /** Blocking the option to select days that are earlier that selected start time (day+exact time in hours, minutes)
  * @param min: selected start day
  */
  blockPrevTime(){
    this.min= new Date(this.min);
    this.min.setMinutes(this.min.getMinutes()+1); //An event must be at least 1 minute, so we're adding it here
  }
  
  enableEndDatePicker(){
    this.disabledDateButton = false;
  }
  
  ngOnInit() {
    this.nameSel.cm.subscribe(user => this.user = user);
    if(this.user==null){
      this.router.navigateByUrl('menu');
    }      
  }
  
  addActivity(val:string,color:string){
    if (this.firstAddition){
      this.newEventIndex = this.types.length;
      this.firstAddition=false;
    }
    this.types.push(new ActivityTypes(val,val,color));
    this.newEventTypeSubmited=true;
    this.edited=true;
  }  
  subEvent() {
    this.submitted = true;/*do something*/
    if (this.newEventTypeSubmited){
      for (let i=this.newEventIndex; i < this.types.length ; i++){
        console.log[i];
        this.userService.updateEventTypes(this.types[i]);
      }
    }
    
    this.model.start = new Date(this.model.start);
    this.model.end = new Date(this.model.end);
    /**input values in recEvent */
    this.chooseFreq();
    this.recEvent.rrule.byhour = this.model.start.getHours();
    this.recEvent.rrule.byminute = this.model.start.getMinutes();
    this.recEvent.title=this.model.describe;
    this.recEvent.rrule.until=this.model.end;
    this.recEvent.rrule.byweekday=this.selectedOptions;
    if (this.recEvent.rrule.bymonthday != null){
    this.recEvent.rrule.bymonthday = this.recEvent.rrule.bymonthday+1;
    }
    
    
    let answer;
    if (this.model.activity.value == "general-0"){
      answer = this.userService.addRecurringEvent(JSON.parse(JSON.stringify(this.recEvent)));
    }
    else {
      answer = this.userService.addEvent(this.user, this.model);
    }
    
    /** */
    if (answer)
    {
      alert("האירוע נוסף בהצלחה");
      this.router.navigateByUrl('menu');
    }
  }
  monthNday(){
    for(let i=0;i<=30;i++){
      if(i<12){
        this.months.push(i+1);
      }
      this.days.push(i+1);
    }
  }
  chooseFreq(){
    if(this.selRecc==='יומי'){
      this.recEvent.rrule.freq=RRule.DAILY;
    }
    else if(this.selRecc==='שבועי'){
      this.recEvent.rrule.freq=RRule.WEEKLY;
    }
    else if(this.selRecc==='חודשי'){
      this.recEvent.rrule.freq=RRule.MONTHLY;
    }
  }
  
  get selectedOptions() {
    return this.weekdayArr
    .filter(opt => opt.checked)
    .map(opt => opt.value)
  }
}
