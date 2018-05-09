import { Component, OnInit } from '@angular/core';
import { test } from '../models/test.model';
import { resident } from '../models/resident.model';
import { staff } from '../models/staff.model';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
  
  constructor(private userService: UserService) { }
  bla: test;
  resident: resident;
  staff: staff;

  ngOnInit() {
    
    // Working, but this is not the way we want to pass the data
    this.userService.staff.push( {
      name: "hhello",
      age: "what",
    });
    
    this.resident = new resident("Rami from test", "Ami2", 542, true, "4/2/3", 2, "Benni", true, false) // According to resident.option #2
    this.staff = new staff("avi from test","ron2",8651, true, "2/4/6", 2, "sadsadsadsa", "supervisor"); // According to staff.option #2
    
    this.userService.testing.push(this.bla);
    this.userService.residentsUsers.push(this.resident);
    this.userService.staffUsers.push(this.staff);
   // localStorage.setItem("residentUsers", JSON.stringify(this.userService.residentsUsers));

  }
  
}

