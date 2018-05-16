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
  message:string;
  types = [
    {value: 'general-0', viewValue: 'כללי'},
    {value: 'staff-1', viewValue: 'איש צוות'},
    {value: 'res-2', viewValue: 'דייר'}//add more
  ];
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
  
  constructor( private nameSel: NameSelectService, private userService: UserService) {
    this.submitted = false;
    this.model = new Event(
      {date:null,start:null,end:null},
      false, 
      null,
      null 
    );
  }
  ngOnInit() {
    this.nameSel.cm.subscribe(message => this.message = message);
  }
    
  subEvent(obj: Event) {
    this.submitted = true;/*do something*/
    alert(this.submitted);
   // console.log(obj);
    this.userService.passEvent(this.model);
  }
}