/**Sources for this component:
* - https://angular.io/guide/forms for general form
* - https://material.angular.io/components/form-field for email address
* - https://material.angular.io/components/datepicker for age
* - https://scotch.io/tutorials/angular-2-form-validation for validating fields 
*/

import { Component, OnInit } from '@angular/core';
import {staff} from '../models/staff.model'
import { Router ,RouterEvent} from '@angular/router';
import {NgModel} from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
// TODO: check required fields
export class AddStaffComponent implements OnInit {
  
  email = new FormControl('', [Validators.required, Validators.email]);
  phoneNumber = new FormControl(null, [Validators.required, Validators.pattern("[0-9]{10}")]);
  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'הכנס כתובת אימייל' :
    this.email.hasError('email') ? 'אינה כתובת אימייל' :
    '';
  }
  getPhoneErrorMessage(){
    return this.phoneNumber.hasError('required') ? 'הכנס מספר טלפון' :
    this.phoneNumber.hasError('pattern') ? 'מספר שגוי' :
    '';
  }
  
  private model: staff ;
  private submitted: boolean;
  
  constructor(private userService: UserService, public router: Router ) {
    this.submitted = false;
    this.model = new staff(
      '', 
      '',
      0,
      true,
      '',
      0,
      '',
      '',
      "staff",
      []
    );
    console.log(this.model);
  }
  ngOnInit() {
  }
  
  subStaff(staffMember:staff) {
    this.submitted = true;/*do something*/
    
    this.userService.addToDatabase(this.model);
    this.router.navigateByUrl('menu');
  }
}
