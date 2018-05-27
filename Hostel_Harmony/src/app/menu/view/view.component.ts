import { Component, OnInit , Input } from '@angular/core';
import {staff} from '../../models/staff.model'
import {resident} from '../../models/resident.model'
import { NgModel,FormGroup } from '@angular/forms'
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @Input()//for getting name wanted
  name:string;
  submitted:boolean
  vstaff:staff
  vresident:resident
  constructor() {
    this.submitted=false
    this.vstaff=new staff('moshe','cohen',0,true,'26',3,'pert@il','king');
    this.vresident=new resident('moshe','aviv',0,true,'24',-1,'ben','ben','2018',false,[{rel:'dd',name:'mm',phone:0},{rel:'dn',name:'mmgg',phone:0}],{info:'',phone:0,location:''},{psych:'',gp:''});
   }

  ngOnInit() {
  }

}
