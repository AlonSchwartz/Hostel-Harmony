import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NameSelectService} from '../services/nameSelect/name-select.service';
import {NgModel} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  constructor(private router: Router,private data:NameSelectService, private authService: AuthService, private userService: UserService) { 
    
  }
  name:string;
  current = new Date()
  staff:string[];
  staffName:string[][];//= this.userService.getStaffNames();
  //staff:string[]= [''];
  residents:string[];
  residentName:string[][]=this.userService.getResidentsNames();//['דייר 1','דייר 2','דייר 3','דייר 4','דייר 5'];
  getNames(){
    console.log(this.staffName)
    for(var i=0;i<this.staffName.length;i++){
      this.staff[i]=this.staffName[i][0];
      console.log(this.staff[i])
    }
    for(var i=0;i<this.residentName.length;i++){
      this.residents[i]=this.residentName[i][0];
    }
  }
  //residentNames: string[][] = this.userService.getStaffNames();
  navigateTo(value) {
    if (value) {
      this.router.navigate([value]);
    }
    return false;
  }
  ngOnInit() {
    this.staffName= this.userService.getStaffNames();
    console.log(this.staffName.length)
    this.getNames();
    this.data.cm.subscribe(message =>this.name=message);
  }
  sendVal(selval:string){
    this.data.changeMessage(selval);
  }
  
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
