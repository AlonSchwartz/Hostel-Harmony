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

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
// TODO: check required fields
//       try to extract time or date from ISO format in json - use Date function!
export class EventComponent implements OnInit {
  private date: Date = new Date();

  private model = {start: this.date, end: this.date, title: "", issuer: "", activity: "", describe: ""} as CALtest ;
  private submitted: boolean;
  private customActivity:string;
  private newEventTypeSubmited:boolean=false;
  user:staff|resident;
  types :ActivityTypes[]=[];
  private newEventIndex = -1;
  public edited:boolean=false;
  private firstAddition:boolean=true;
  private test: CalendarEvent;
  test2: CALtest;

  /*
  [
    {value: 'general-0', viewValue: 'כללי',color:'green'},
    {value: 'staff-1', viewValue: 'איש צוות',color: 'blue'},
    {value: 'res-2', viewValue: 'דייר', color:'yellow'},
    public edited:boolean=false;
    user:staff|resident;
    types :ActivityTypes[]=[
      {value: 'add', viewValue: ' הוסף אירוע חדש  +',color:'white'},
    ];
    */
    
    constructor( private nameSel: NameSelectService, private userService: UserService, public router: Router) {
      this.userService.getEventTypes().then(()=> this.types = this.userService.eventTypes);
      this.submitted = false;
      this.customActivity=null;
      console.log(this.model);
      /*
      new CalEvent(
        {start:'',end:''},
        false, 
        '',
        '',
        '' 
      );
*/
      
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
      //alert(this.submitted);
      // console.log(obj);
      //console.log(this.user)
      if (this.newEventTypeSubmited){
        for (let i=this.newEventIndex; i < this.types.length ; i++){
          console.log[i];
          this.userService.updateEventTypes(this.types[i]);
        }
        
        //console.log(this.types.values());
        // console.log(this.types.filter(type => this.types[3] != this.types[4]));
        //console.log(this.userService.getEventTypes());
        
        // this.userService.updateEventTypes(this.types[2]);
      }
      console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ")
      console.log(this.model)
      this.model.start = new Date(this.model.start);
      this.model.end = new Date(this.model.end);
      console.log(this.model)
      this.userService.addEvent(this.user, this.model);
      alert("האירוע נוסף בהצלחה");
      this.router.navigateByUrl('menu');
    }
    
  }