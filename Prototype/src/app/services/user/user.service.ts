import { Injectable, OnInit } from '@angular/core';
import { staff } from '../../models/staff.model';
import { test } from '../../models/test.model';
import { resident } from '../../models/resident.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { firebase } from '../../../environments/environment.prod';
import { FirebaseDatabase } from '@firebase/database-types';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class UserService  {
  
  staffUsers: staff[] = [];
  residentsUsers: resident[] = []
  
  
  private testArray: test 
  testing: test[] = []
  be: test;
  
  staff = [
    {
      name: "",
      age: "",
    },
    {
      name: "no",
      age: "no2"
    }
  ];
  
  
  public dc;
  
  //constructor(private afs: AngularFirestore) { 
  constructor(private afs: AngularFireDatabase) { 
    const settings = { timestampsInSnapshots: true };
    //afs.firestore.settings(settings);
    
    // According to AngularFireStorm
    // this.dc = afs.collection<any>('ABC');
    // this.dc.add(this.residentsUsers);
    
    
    
    this.be = new test(true, "Bamba", "Bisli","Osem", "none");
    
    this.testing = [
      this.be, 
      //new test(true, "Alon", "Schwa","hi", "none")
      
    ];
    
    
    this.residentsUsers = [
      new resident("Yossi", "Avi", 542, true, "1/2/3", 2, "David", false, false), // According to resident.option #2
    ];
    
    
    this.staffUsers = [
      new staff("Ot","ron2",6535, true, "2/4/6", 2, "ffda", "supervisor"), // According to staff.option #2
    ];
    
    //adding to localstorage - just for testing...
    //localStorage.removeItem('residentUsers');
    //localStorage.setItem("residentUsers", JSON.stringify(this.residentsUsers));
    
    //this.dc.add(resident);
    
    //this.afs.collection("test").add({just: "a test"});
    //this.dc.add({just: "a test 2"});
    
    console.log(this.residentsUsers);
    console.log("----------");
    console.log(this.staffUsers);
    
    
    //afs.list('/residents').push(this.residentsUsers);
    
    
    // According to AngularFireDatabase
    afs.list('/residents/test2').push(this.residentsUsers);
    afs.list('/staff').push(this.staffUsers);
    
    
    //this.staff.push(this.testArray);
    
    
    //Some more testing
    /*
    this.testArray;
    this.staff[0].age = "DOES IT WORKS";
    console.log(this.staff);
    console.log(this.testing);
    console.log("-----residents-----");
    console.log(this.residentsUsers);
    console.log(this.staffUsers);
    */
    // this.staffUsers[0];
    //console.log(this.staffUsers);
    
    /*
    this.staffUsers[0].birthday = '';
    this.staffUsers[0].email = '';
    this.staffUsers[0].firstName = '';
    this.staffUsers[0].lastName = '';
    this.staffUsers[0].phoneNumber = -1;
    this.staffUsers[0].role = '';
    this.staffUsers[0].calendarID = -1;
    
    console.log(this.staffUsers);
    */
  }
  
}
