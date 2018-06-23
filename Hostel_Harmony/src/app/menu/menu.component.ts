import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NameSelectService} from '../services/nameSelect/name-select.service';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { staff } from '../models/staff.model';
import { resident } from '../models/resident.model';
import {MatDialog, MatDialogConfig} from "@angular/material"
import { DialogFiComponent } from './dialog-fi/dialog-fi.component'
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Hostel users files'
    };
    const dialogRef = this.dialog.open(DialogFiComponent, dialogConfig);    
  }
  constructor(private dialog: MatDialog,private router: Router,private data:NameSelectService, private authService: AuthService, private userService: UserService, private calendar:CalendarComponent) { 
    userService.getStaff().then(()=>{ 
      this.getNames() });
      
      userService.getResidents().then(()=>{ 
        this.getNames() 
      }); 

    }
    name:string;
    current = new Date();
    selected:staff|resident;
    sel2:resident;
    staff:string[][] = new Array(["",""]);

    residents:string[][] =new Array(["",""]);
    ress:resident[] = [];
    
    staa: staff[] = [];
    
    getNames(){
      this.staa=this.userService.staffUsers;
      this.ress = this.userService.residentsUsers;

      for (var i=0; i<this.staa.length; i++)
      {
        this.staff[i] = [this.staa[i].firstName + " " + this.staa[i].lastName,this.staa[i].id];
      }
      
      for (var i=0; i<this.ress.length; i++)
      {
        this.residents[i] = [this.ress[i].firstName + " " + this.ress[i].lastName,this.ress[i].id];
      }
      //remove non active users //
      for (var i=0; i<this.staff.length; i++){
        if(!this.staa[i].isActive){
          this.staff.splice(i)
        }
      }
      for (var i=0; i<this.residents.length; i++){
        if(!this.ress[i].isActive){
          this.residents.splice(i)
        } 
      } 
    }
    
    navigateTo(value) {
      if (value) {
        this.router.navigate([value]);
      }
      return false;
    }
    ngOnInit() {

    }
    sendVal(selval:string[][]){

      let svConv = JSON.parse(JSON.stringify(selval));
      let svSplitted = svConv.split(',')

      if((this.selected=this.userService.getSelectedUser(svSplitted,this.residents,this.ress))!=null || 
      (this.selected=this.userService.getSelectedUser(svSplitted,this.staff,this.staa))!=null){
        this.data.changeMessage(this.selected)        
      }
      if((this.sel2=this.userService.getSelectedUser(svSplitted,this.residents,this.ress))!=null){
        this.data.exportUser(this.sel2);
        this.calendar.changeView(this.sel2);
      }
    }
    
    logout(){
      this.authService.logout();
      this.router.navigateByUrl('login');
    }
    
  }
  
