/**Sources for this component:
 * - https://angular.io/guide/forms for general form
 * - https://material.angular.io/components/select for activity select
 * - https://material.angular.io/components/checkbox for check if needs assignee
 * - https://github.com/DanielYKPan/date-time-picker for date and time pick
 */

import { Component, OnInit } from '@angular/core';
import {Event} from '../models/event.model';
import {NgModel} from '@angular/forms';
import {NameSelectService} from '../services/nameSelect/name-select.service';
import { supportsPassiveEventListeners } from '@angular/cdk/platform';
import { UserService } from '../services/user/user.service';
import { ActivityTypes } from '../models/activity-types.model'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
// TODO: check required fields
//       try to extract time or date from ISO format in json - use Date function!
export class EventComponent implements OnInit {
  private model: Event ;
  private submitted: boolean;
  private customActivity:string;
  message:string;
  types :ActivityTypes[]=[
    {value: 'general-0', viewValue: 'כללי',color:'green'},
    {value: 'staff-1', viewValue: 'איש צוות',color: 'blue'},
    {value: 'res-2', viewValue: 'דייר', color:'yellow'},
  ];
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
  
  constructor( private nameSel: NameSelectService, private userService: UserService) {
    this.submitted = false;
    this.customActivity=null;
    this.model = new Event(
      {date:null,start:null,end:null},
      false, 
      null,
      null,
      null 
    );
  }
  ngOnInit() {
    this.nameSel.cm.subscribe(message => this.message = message);
  }
  addActivity(val:string,color:string){
    this.types.push(new ActivityTypes(val,val,color));
  }  
  subEvent(obj: Event) {
    this.submitted = true;/*do something*/
    alert(this.submitted);
   // console.log(obj);
    this.userService.passEvent(this.model);
  }
}