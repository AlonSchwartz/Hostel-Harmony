import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NameSelectService} from '../services/nameSelect/name-select.service';
import {NgModel} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { staff } from '../models/staff.model';
import { resident } from '../models/resident.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  constructor(private router: Router,private data:NameSelectService, private authService: AuthService, private userService: UserService) { 
    this.userService.getStaff(); this.userService.getResidents(); //this.getNames();
  }
  name:string;
  current = new Date()
  staff:string[] = [];
  //staffName:any= this.userService.getStaff();
  residents:string[] = [];
  ress:resident[] = [];

  staa: staff[] = [];

  getNames(){
    this.staa = this.userService.getStaff();
    this.ress = this.userService.getResidents();
    
    for (var i=0; i<this.staa.length; i++)
    {
      this.staff[i] = this.staa[i].firstName + " " + this.staa[i].lastName;
    }

    for (var i=0; i<this.ress.length; i++)
    {
      this.residents[i] = this.ress[i].firstName + " " + this.ress[i].lastName;
    }
    
  }

  navigateTo(value) {
    if (value) {
      this.router.navigate([value]);
    }
    return false;
  }
  ngOnInit() {
    
    //this.getNames();
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
