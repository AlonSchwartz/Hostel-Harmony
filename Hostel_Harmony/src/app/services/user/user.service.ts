import { Injectable, OnInit } from '@angular/core';
import { staff } from '../../models/staff.model';
import { test } from '../../models/test.model';
import { resident } from '../../models/resident.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { firebase } from '../../../environments/environment.prod';
import { FirebaseDatabase } from '@firebase/database-types';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { EventComponent } from '../../event/event.component';
import { CalendarComponent } from '../../menu/calendar/calendar.component';
import { Event } from '../../models/event.model';


// This file is very messy right now, with alot of comments and testing. I will organize it soon. 

@Injectable()
export class UserService  {
  


  staffUsers: staff[] = [];
  residentsUsers: resident[] = []
  
  
  private testArray: test 
  testing: test[] = []
  be: test;
  
  public dc;
  
  //constructor(private afs: AngularFirestore) { 
  constructor(private afs: AngularFireDatabase, private calendar: CalendarComponent) { 
    const settings = { timestampsInSnapshots: true };
    
    //afs.firestore.settings(settings);
    
    // According to AngularFireStorm
    // this.dc = afs.collection<any>('ABC');
    // this.dc.add(this.residentsUsers);
    
    this.residentsUsers = [
      //new resident("Yossi", "Avi", 542, true, "1/2/3", 2, "David", false, false), // According to resident.option #2
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
    
    /*
    console.log(this.residentsUsers);
    console.log("----------");
    console.log(this.staffUsers);
    */
    
    //afs.list('/residents').push(this.residentsUsers);
    
    
    // According to AngularFireDatabase
    
    var dbtest = afs.database;
    var ref  = dbtest.ref("residents/");
    var temp;
    /*
    console.log("------ Testing ------");

    var abc = dbtest.ref();
    abc.on("value", function(snapshot2)
    { //console.log(snapshot.val()); 
      console.log(snapshot2.val().what.goodbye); // = 4
      abc.orderByChild("what").on("child_added", function(snapshot3){
        //console.log(snapshot3.key)
        //console.log(snapshot3.key.includes("what"));
        //console.log(snapshot3.key.lastIndexOf("staff"));
        
      })
      
    }, 
      function (errorObject){
        console.log("the read failed: " + errorObject.code)
      });

*/

    // To get the data from firebase. will get all the data from 'ref', as initilized 2 lines up
    ref.on("value", function(snapshot)
    { //console.log(snapshot.val()); 
      temp = snapshot.val();  
      
    }, 
      function (errorObject){
        console.log("the read failed: " + errorObject.code)
      });
      //console.log("------------");
      
      afs.list('/residents/test3').push(this.residentsUsers);
      //afs.list('/staff').push(this.staffUsers);
      
      afs.database.ref('testing/' + 5678).set(this.residentsUsers); // This way we don't have unique key for each line at the database
      
      //console.log("length = " + afs.database.ref.length);
      //afs.database.ref('testing/' + 5678).update(this.residentsUsers);    
      /*
      //More testing...
      const updates = {}; 
      updates['/hello'] = 5;
      updates['/goodbye'] = 4;
      console.log(updates);
      
      afs.database.ref('what').update(updates);
      */
      
      
      afs.database.ref('testing/' + 5678).push({just: "a test"});
      afs.database.ref('testing/' + 5678).update(({what: "is this"}));
      afs.database.ref('testing/' + 5678).update(({does: "it works?"}));
      afs.database.ref('testing/' + 80).update(({does: "it works?"}));
      
      // console.log(this.residentsUsers);
      
    }
    // To pass event to the calendar
    public passEvent(eve:Event){
      
      alert("I'm in userService and i got your event!")
      // console.log(eve);
      // here needs to be some checking... if everything is ok, add to database and then pass it to the calendar.
      this.calendar.addEvent(eve);
      
    }
    
  }
  