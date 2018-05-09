/**Sources for this component:
 * - https://angular.io/guide/forms for general form
 * - https://material.angular.io/components/form-field for email address
 * - https://material.angular.io/components/datepicker for age
 * - https://scotch.io/tutorials/angular-2-form-validation for validating fields 
 */

import { Component, OnInit } from '@angular/core';
import {Staff} from '../models/staff.model'
import {NgModel} from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
// TODO: check required fields
export class AddStaffComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  private model: Staff ;
  private submitted: boolean;
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  constructor( ) {
    this.submitted = false;
    this.model = new Staff(
      null, 
      null,
      null,
      null,
      null,
      null
    );
  }
  ngOnInit() {
  }
  
  subStaff(obj:object) {
    this.submitted = true;/*do something*/
    alert(this.submitted);
    console.log(obj);
  }
}
