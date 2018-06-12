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
  copy:staff|resident;
  // selectedCopy:staff|resident;
  pageMode : string;
  constructor(private userService: UserService,private nameSel: NameSelectService) {
   }

  ngOnInit() {
    this.nameSel.cm.subscribe(selected => this.selected = selected);
    console.log(this.selected)
    //this.nameSel.cm.subscribe(selected => this.selectedCopy = selected);
    this.pageMode = "viewMode";
    this.copy = Object.assign({}, this.selected);
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
  editUser() : void {
    this.pageMode = "editMode";
  }
  
  saveChanges() : void {
      this.userService.update(this.selected)
       this.pageMode = "viewMode";
       console.log("dsfd")

  }
  
  cancelEdit() : void {
    //this.nameSel.cm.subscribe(selected => this.selected = selected);
    Object.assign(this.selected,this.copy);
    this.pageMode = "viewMode";
  }

}
