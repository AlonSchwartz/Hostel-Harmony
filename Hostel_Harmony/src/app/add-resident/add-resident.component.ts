/**Sources for this component:
 * - https://angular.io/guide/forms for general form
 * - https://material.angular.io/components/datepicker for age
 */

import { Component, OnInit } from '@angular/core';
import {resident} from '../models/resident.model';
import { Router ,RouterEvent} from '@angular/router';
import {NgModel,FormGroup,FormArray,FormBuilder ,FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';


@Component({
  selector: 'app-add-resident',
  templateUrl: './add-resident.component.html',
  styleUrls: ['./add-resident.component.css']
})
// TODO: check required fields
export class AddResidentComponent implements OnInit {
  private model: resident ;
  private submitted: boolean;
  myForm: FormGroup;
  // TODO: Remove this when we're done--->testing purposes
  get diagnostic() { return JSON.stringify(this.model); }

  constructor(private fb:FormBuilder, private userService: UserService, public router: Router ) {
    this.submitted = false;
    this.model = new resident(
      '', 
      '',
      0,
      true,
      '',
      0, 
      '',
      '',
      '',
      false,
      [this.buildItem('').value,this.buildItem('').value,],
      {info:'',phone:0,location:''},
      {psych:'',gp:''},
    );
  }
  ngOnInit() {
    this.myForm = this.fb.group({
      items: this.fb.array(
        [this.buildItem(''), this.buildItem('')])
    })
  }
  
  public buildItem(val: string) {
    return new FormGroup({
      rel:new FormControl(val),
      name: new FormControl(val),
      phone: new FormControl(0),
    })
  }
  subResident(obj:resident) {
    this.submitted = true;/*do something*/
    //alert(this.submitted);
    //console.log(obj);
    this.userService.addNewResident(this.model);
    this.router.navigateByUrl('menu');
  }
 

}
