/**Sources for this component:
 * - https://angular.io/guide/forms for general form
 * - https://material.angular.io/components/datepicker for age
 */

import { Component, OnInit } from '@angular/core';
import {addResident} from '../models/add-resident.model';
import {NgModel} from '@angular/forms';


@Component({
  selector: 'app-add-resident',
  templateUrl: './add-resident.component.html',
  styleUrls: ['./add-resident.component.css']
})
// TODO: check required fields
export class AddResidentComponent implements OnInit {
  private model: addResident ;
  private submitted: boolean;
  
  // TODO: Remove this when we're done--->testing purposes
  get diagnostic() { return JSON.stringify(this.model); }

  constructor( ) {
    this.submitted = false;
    this.model = new addResident(
      null, 
      null,
      null, 
      {rel:null, name:null,phone:null},
      null,
      null,
      {info:null,phone:null,location:null} 
      ,{psych:null, gp:null}
    );
  }
  ngOnInit() {
  }
  subResident(obj:object) {
    this.submitted = true;/*do something*/
    alert(this.submitted);
    console.log(obj);
  }

}
