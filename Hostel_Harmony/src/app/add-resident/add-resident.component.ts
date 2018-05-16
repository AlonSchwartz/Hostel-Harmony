/**Sources for this component:
 * - https://angular.io/guide/forms for general form
 * - https://material.angular.io/components/datepicker for age
 */

import { Component, OnInit } from '@angular/core';
import {resident} from '../models/resident.model';
import {NgModel,FormGroup,FormArray,FormBuilder ,FormControl, Validators } from '@angular/forms';


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

  constructor(private fb:FormBuilder ) {
    this.submitted = false;
    this.model = new resident(
      null, 
      null,
      null,
      true,
      null,
      null, 
      null,
      null,
      false,
      [this.buildItem(null).value,this.buildItem(null).value,],
      {info:null,phone:null,location:null},
      {psych:null,gp:null}
    );
    console.log(this.buildItem('asd').get('rel').value);
    // console.log(this.myForm.controls.items );
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
      phone: new FormControl(null),
    })
  }
  subResident(obj:object) {
    this.submitted = true;/*do something*/
    alert(this.submitted);
    console.log(obj);
  }
 

}
