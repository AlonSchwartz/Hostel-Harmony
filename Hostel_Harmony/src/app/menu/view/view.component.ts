import { Component, OnInit , Input } from '@angular/core';
import {staff} from '../../models/staff.model'
import {resident} from '../../models/resident.model'
import { NgModel,FormGroup } from '@angular/forms'
import { UserService } from '../../services/user/user.service';
import { NameSelectService } from '../../services/nameSelect/name-select.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @Input()//for getting name wanted
  name:string;
  selected:staff|resident;
  submitted:boolean
  model:staff|resident;
  pageMode : string;
  constructor(private userService: UserService,private nameSel: NameSelectService) {
   }

  ngOnInit() {
    this.nameSel.cm.subscribe(selected => this.selected = selected);
    this.nameSel.cm.subscribe(selected => this.model = selected);
    // console.log(this.selected)

    this.pageMode = "viewMode";
    
  }
  getSince(since){
    let ret=new Date(since)
    return ret.getDate()+'/'+ret.getMonth()+'/'+ret.getFullYear();
  }
  getAge(dateString) 
  {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
          age--;
      }
      return age.toString();
  }
  editManufacturer() : void {
    
    //note this is not a replacement for angular.copy().
    //.assign() creates a *shallow* copy, meaning that any properties containing
    //references and not simple types will simply have the reference copied to the new
    //object, instead of copying the values within that reference (i.e. a deep copy)
    //discussion: http://stackoverflow.com/questions/34688517/how-can-i-use-angular-copy-in-angular-2
    //           https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    Object.assign(this.model, this.selected);
  
    this.pageMode = "editMode";
  }
  
  newManufacturer() : void {
    
    Object.assign(this.model, this.selected);
    
    //this works without having assign empty property values
    // this.selected = null;
    
    this.pageMode = "editMode";
    
  }
  
  saveManufacturer() : void {
    
    // for some reason, manufacturerForm.valid is not available here
    // It works here: http://plnkr.co/edit/IElMhx2Kcos7VLrI2QfC?p=preview 
    // if we add: import { FORM_DIRECTIVES, ControlGroup, Control, Validators, FormBuilder, Validator, } from '@angular/common';
    // and directives: [FORM_DIRECTIVES]
    // but this doesn't work on the page (maybe need to add to app.module??)
    // if (manufacturerForm.checkValidity()) {
    //   this.model = null;
    //   this.pageMode = "viewMode";
    // }
  }
  
  cancelEdit() : void {
    Object.assign(this.selected, this.model);
    // this.model = null;
    this.pageMode = "viewMode";
    
  }

}
