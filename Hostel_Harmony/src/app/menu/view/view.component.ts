import { Component, OnInit , Input, SimpleChange, OnChanges } from '@angular/core';
import {staff} from '../../models/staff.model'
import {resident} from '../../models/resident.model'
import { NgModel,FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms'
import { UserService } from '../../services/user/user.service';
import { NameSelectService } from '../../services/nameSelect/name-select.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit,OnChanges {
  @Input()//for getting name wanted
  name:string;
  selected:staff|resident;
  copy:staff|resident;
  
  myForm: FormGroup;
  pageMode : string;
  constructor(private fb:FormBuilder,private userService: UserService,private nameSel: NameSelectService) {
   }

  ngOnInit() {
    this.nameSel.cm.subscribe(selected => this.selected = selected);
    this.pageMode = "viewMode";
    this.enterCont();
  }
  ngOnChanges(changes:{[propKey:string]:SimpleChange}){
    for(let na in changes){
      let rec=changes[na];
      let temp=JSON.stringify(rec.currentValue);
      if(!rec.isFirstChange()){
        this.nameSel.cm.subscribe(selected => this.selected = selected);
        this.enterCont();
        this.pageMode = "viewMode";
      }
    }
  }
  arr:resident;
  public enterCont(){
    /**enter contacts to view */
    if(this.selected.className==='resident'){
      this.myForm = this.fb.group({
        items: this.fb.array(
          [])
      });
      this.arr=this.selected as resident;
      const item=this.myForm.get('items') as FormArray;
      for( let i=0;i<this.arr.contacts.length;i++){
        item.push(this.editItem(this.arr.contacts[i]));
      }
    }
    /**deep copy*/
    this.copy=JSON.parse(JSON.stringify(this.selected)) 
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
  public editItem(inp:any) {
    return new FormGroup({
      rel:new FormControl(inp.rel),
      name: new FormControl(inp.name),
      phone: new FormControl(inp.phone),
    })
  }
  
  editUser() : void {
    console.log(this.copy)
    this.pageMode = "editMode";
  }
  
  saveChanges() : void {
      this.userService.update(this.selected)
       this.pageMode = "viewMode";

  }
  
  cancelEdit() : void {
    this.selected=JSON.parse(JSON.stringify(this.copy))
    this.pageMode = "viewMode";
  }
  alertUser(){
    if(confirm('האם אתה בטוח שברצונך להסיר? \n אם כן- אשר ושמור שינויים')){
      this.selected.isActive=false;
    }
  }
  get checkActive(){
    
    if(this.selected.isActive){
      return 'כן';
    }
    return 'לא' ;
  }

}
