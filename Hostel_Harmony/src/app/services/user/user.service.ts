import { Injectable, OnInit } from '@angular/core';
import { staff } from '../../models/staff.model';
import { test } from '../../models/test.model';
import { resident } from '../../models/resident.model';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import {  RecurringEvent } from '../../menu/calendar/calendar.component';
import { CalEvent, CALtest } from '../../models/event.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { EvalForm } from '../../models/eval-form.model';
import { ActivityTypes } from '../../models/activity-types.model';
import * as RRule from 'rrule';



@Injectable()
export class UserService  {
  
  staffUsers: staff[] = [];
  residentsUsers: resident[] = []
  staff: staff;
  staff2: staff; //staffMember
  resident: resident = null;
  staffNames: string[][] = [[""],["",""]];
  residentNames: string[][] = [[""],["",""]];
  eventTypes: ActivityTypes[] = [];
  eventType: ActivityTypes;
  recurringEvents: RecurringEvent[]= [];
  recurringEvent: RecurringEvent;
  
  private testArray: test 
  testing: test[] = []
  be: test;
  
  // These variables will hold up our collections, which is stored at firebase
  public dataCollections; //will hold the DB collection table that is stored in the firebase
  public dbusers;
  public dc;
  public residentsCollection;
  public staffCollection;
  public eventTypesCollection;
  public RecurringEventsCollection;
  
  listingDoc: AngularFirestoreDocument<resident>;
  public dcTest;
  res:resident;
  sta:staff;
  ev2: CalEvent;
  //generalSettings={eventTypes:ActivityTypes[""]}
  types2:ActivityTypes;
  
  observableUsers: Observable<resident[]>; //A temp variable that returns metadata. used by usersList
  residentUsersList = []; //To store all residents with ID's
  staffUsersList = []; //To store all staff with ID's
  recEventsList = []; // //To store all recurring events with ID's
  
  
  constructor(af: AngularFirestore) { 
    
    const settings = { timestampsInSnapshots: true }; // setting up
    af.firestore.app.firestore().settings(settings);
    
    // Initializing our vars to acctually hold up the collections
    this.dataCollections = af.collection<any>("TestingIScool2"); 
    this.dc = af.collection<any>('Books'); 
    this.dcTest = af.collection<any>('Books').doc('3e5c6mgUZzzGYgIoUUzn');
    this.residentsCollection = af.collection<any>("residents"); 
    this.staffCollection = af.collection<any>("staff"); 
    this.eventTypesCollection = af.collection<any>("eventTypes");
    this.RecurringEventsCollection = af.collection<any>("recurringEvents");
    
    // Initializing staff & resident with dummy data, so it won't be undefined
    this.staff = new staff("Ot","ron2",6535, true, "2/4/6", 2, "ffda", "supervisor");
    this.staff2 = new staff("","",-1, true, "", -1, "", "","staff",[]);
    this.resident = new resident("","",-1,true,"",-1,"","","",false,[],{info:null, phone:null, location:null},
    {psych:null,gp:null},"resident");
    
    this.res = new resident("","",-1,true,"",-1,"","","",false,[],{info:null, phone:null, location:""},
    {psych:null,gp:null},"resident");
    
    this.residentsUsers = [
      //new resident("Yossi", "Avi", 542, true, "1/2/3", 2, "David", false, false), // According to resident.option #2
    ];
    
    
    this.staffUsers = [
      new staff("Ot","ron2",6535, true, "2/4/6", 2, "ffda", "supervisor"), // According to staff.option #2
    ];
    
    this.eventType = new ActivityTypes("", "", "");
    this.recurringEvent = {title:"", describe:"",color:"", rrule:{bymonth:-1,bymonthday:-1,freq:RRule.YEARLY }}
    
    
    //this.generalSettings.eventTypes = [];
    /*
    [{value: 'general-0', viewValue: 'כללי',color:'green'},  {value: 'staff-1', viewValue: 'איש צוות',color: 'blue'},
    {value: 'res-2', viewValue: 'דייר', color:'yellow'}];
    */
    //  Calling these functions to initilize them
    this.setMetaData();
    this.setStaffMetaData();
    this.getResidents();
    this.setRecEventsMetaData()
    this.getrecurringEvents();
    
    
  }
  
  // To pass event to the calendar
  public passEvent(eve:CalEvent){
    //this.staff2.events.push(eve); // IF THE APP STAYS ON THIS PAGE - THIS FUNCTION WONT WORK PROPERLY. WE NEED TO COPY THE VAR OR NAV TO MENU.
    
    // console.log(eve);
    // here needs to be some checking... if everything is ok, add to database and then pass it to the calendar.
    //this.calendar.addEvent(eve);
    
  }
  
  
  /** Receives a resident/staff object and adds it to the relevant database. */
  addToDatabase(per: resident | staff){
    console.log("--------")
    if (per.className == "resident"){
      this.residentsCollection.add(JSON.parse(JSON.stringify(per)));
      console.log("got resident");
    }
    if (per.className == "staff"){
      this.staffCollection.add(JSON.parse(JSON.stringify(per)));
      console.log("got staff");
      
    }
  }
  
  /** Adds evaluation form to relevant resident object */
  addEvalForm(selResident: resident, evalForm: EvalForm){
    selResident.evals.push(evalForm);
    this.residentsCollection.doc(JSON.parse(JSON.stringify(selResident.id))).update(JSON.parse(JSON.stringify(selResident)));
  }
  
  // Needs testing
  addEvent(per: resident | staff, event: CALtest ): boolean{
    this.setMetaData();
    
    if (per.className == "resident"){
      
      this.getResidents();
      this.res = this.residentsUsers[0];   
      if (this.feasibilityCheck(event,per)){
        for (let i = 0; i < this.residentUsersList.length ; i++){        
          if (this.residentUsersList[i].id == per.id){
            console.log("id equals, resident");
            per.events.push(event);
            console.log(per.events)
            this.residentsCollection.doc(JSON.parse(JSON.stringify(per.id))).update(JSON.parse(JSON.stringify(per))).catch(function(error){console.log(error)});
            return true;
          }
        }
      }
      else {
        return false;
      }
      
    }
    if (per.className == "staff"){
      this.getStaff();
      this.sta = this.staffUsers[0]; 
      console.log("=====Debugging====") 
      console.log(event)
      console.log(per.events)
      console.log("=====Debugging====") 
      
      if (this.feasibilityCheck(event,per)){
        for (let i = 0; i < this.staffUsersList.length ; i++){        
          if (this.staffUsersList[i].id == per.id){
            console.log("id equals, staff");
            per.events.push(event);
            this.staffCollection.doc(JSON.parse(JSON.stringify(per.id))).update(JSON.parse(JSON.stringify(per))).catch(function(error){console.log(error)});
            return true;
          }
        }
      }
      else {
        return false;
      }
    }
    
    
  }
  
  /**
  * Checks that we can really add this event without any collision
  */
  feasibilityCheck(event: CALtest,per:resident|staff){

    /**Checking for conflict events for same person */
   
    
    let i=0;
    console.log(per);
    for(i=0; i<per.events.length;i++)
    {
      
      per.events[i].start = new Date(per.events[i].start)
      per.events[i].end = new Date(per.events[i].end)
      
      if(event.start.getDay() ==  per.events[i].start.getDay() ) // In case starting days is equals
      {
        // In case the new event coincides with (at least) the starting time of existing event. 
        // In case the new event starting before (or at) starting time of an existing event and ending after the existing event starts.
        // (NewEvent Starting time <= ExisitingEvent Starting time) AND (NewEvent Ending time > ExisitingEvent Starting time)
        if ((event.start.getTime() <= per.events[i].start.getTime()) && event.end.getTime() > per.events[i].start.getTime() ) 
        {
          let answer = confirm("האירוע שהינך מנסה להוסיף חופף עם אירוע אחר. לתאם בכל זאת? \n פרטי האירוע: " + per.events[i].title + "\n משעה: " + per.events[i].start.getHours() + ":" + per.events[i].end.getMinutes() + " עד שעה: " + per.events[i].end.getHours() + ":" + per.events[i].end.getHours())
          if (answer)
          {
            return true;
          }
          else
          {
            return false;
          }
        }
        // In case the new event coincides with (at least) the ending time of existing event.
        // In case the new event starting after (or at) starting time of an existing event and also starting before existing event ends.
        // ((NewEvent Starting time >= ExisitingEvent Starting time) AND (NewEvent Starting time < ExistingEvent Ending time))
        if ((event.start.getTime() >= per.events[i].start.getTime()) && event.start.getTime() < per.events[i].end.getTime() ) 
        {
          let answer = confirm("האירוע שהינך מנסה להוסיף חופף עם אירוע אחר. לתאם בכל זאת? \n פרטי האירוע: " + per.events[i].title + "\n משעה: " + per.events[i].start.getHours() + ":" + per.events[i].end.getMinutes() + " עד שעה: " + per.events[i].end.getHours() + ":" + per.events[i].end.getHours())
          if (answer)
          {
            return true;
          }
          else
          {
            return false;
          }
        }
        
      }
    }
    return true;
  

  }
  
  /** Updated a resdient or a staff profile at Firestore Database. Used mostly for saving data changes to profile */
  update(per: resident | staff){
    if (per.className == "resident"){
      for (let i = 0; i < this.residentUsersList.length ; i++){        
        if (this.residentUsersList[i].id == per.id){
          console.log("id equals, resident");
          this.residentsCollection.doc(JSON.parse(JSON.stringify(per.id))).update(JSON.parse(JSON.stringify(per))).catch(function(error){console.log(error)});
        }
      }
    }
    
    if (per.className == "staff"){
      for (let i = 0; i < this.staffUsersList.length ; i++){        
        if (this.staffUsersList[i].id == per.id){
          console.log("id equals, staff");
          this.staffCollection.doc(JSON.parse(JSON.stringify(per.id))).update(JSON.parse(JSON.stringify(per))).catch(function(error){console.log(error)});
        }
      }
    }
  }
  // addNewResident(resident: resident){
  //   this.residentsCollection.add(JSON.parse(JSON.stringify(resident)));
  // }
  
  // addNewStaff(staff: staff){
  //   this.staffCollection.add(JSON.parse(JSON.stringify(staff)));
  // }
  
  
  // updateResident(resident: resident){
  
  // }
  
  
  // updateStaff(staff: staff){
  
  
  // Will be changed later to work based on Unique ID
  getStaffProfile(fullName:string){
    
    return null; // profile not found
  }
  
  getResidentProfile(fullName:string){
    
    
  }
  
  // get metadata for residents
  getMetaData() {
    this.observableUsers = this.residentsCollection.snapshotChanges().map(actions => { //all the fields, includes unique hashing key
      return actions.map(a => {
        const data = a.payload.doc.data() as resident;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
    //console.log(this.observableUsers);
    return this.observableUsers;
  }
  
  // set it in residentUsersList
  setMetaData() {
    this.getMetaData().subscribe(res2 => {
      this.residentUsersList = res2;
    });
  }
  
  // get metadata for staff
  getStaffMetaData() {
    this.observableUsers = this.staffCollection.snapshotChanges().map(actions => { //all the fields, includes unique hashing key
      return actions.map(a => {
        const data = a.payload.doc.data() as resident;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
    //console.log(this.observableUsers);
    return this.observableUsers;
  }
  
  // set it in staffUsersList
  setStaffMetaData() {
    this.getStaffMetaData().subscribe(sta2 => {
      this.staffUsersList = sta2;
    });
  }
  
  // get metadata for residents
  getRecEventsMetaData() {
    this.observableUsers = this.RecurringEventsCollection.snapshotChanges().map(actions => { //all the fields, includes unique hashing key
      return actions.map(a => {
        const data = a.payload.doc.data() as RecurringEvent;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
    //console.log(this.observableUsers);
    return this.observableUsers;
  }
  
  // set it in residentUsersList
  setRecEventsMetaData() {
    this.getRecEventsMetaData().subscribe(rec => {
      this.recEventsList = rec;
    });
  }
  
  // To get all staff collection from firebase
  getStaff(){
    //this.setStaffMetaData();
    return new Promise(resolve=>{
      this.staffCollection.valueChanges().subscribe(collection =>  {
        this.staffUsers = [];
        for (var i = 0; i < collection.length ; i++){
          
          this.staff2.birthday = collection[i].birthday;
          this.staff2.calendarID = collection[i].calendarID;
          this.staff2.email = collection[i].email;
          this.staff2.firstName = collection[i].firstName;
          this.staff2.isActive = collection[i].isActive;
          this.staff2.lastName = collection[i].lastName;
          this.staff2.phoneNumber = collection[i].phoneNumber;
          this.staff2.role = collection[i].role;
          this.staff2.events = collection[i].events;
          this.staff2.id = this.staffUsersList[i].id; 
          let copy = Object.assign({}, this.staff2); // push delivers by reference, so we need to copy our object first
          this.staffUsers.push(copy);
        }
        resolve();    
      })})
    }
    
    // To get all resident collection from firebase
    getResidents(){
      //this.setMetaData();
      return new Promise(resolve=>{
        this.residentsCollection.valueChanges().subscribe(collection =>  {
          this.residentsUsers = [];
          
          for (var i = 0; i < collection.length ; i++){
            
            this.resident.birthday = collection[i].birthday;
            this.resident.calendarID = collection[i].calendarID;
            this.resident.caretaker = collection[i].caretaker;
            this.resident.className = collection[i].className;
            this.resident.contacts = collection[i].contacts;
            this.resident.doctors = collection[i].doctors;
            this.resident.firstName = collection[i].firstName;
            this.resident.hasWork = collection[i].hasWork;
            this.resident.isActive = collection[i].isActive;
            this.resident.lastName = collection[i].lastName;
            this.resident.memberSince = collection[i].memberSince;
            this.resident.metaem = collection[i].metaem;
            this.resident.evals = collection[i].evals;
            this.resident.events = collection[i].events;
            this.resident.work = collection[i].work;
            this.resident.id = this.residentUsersList[i].id;    
            
            let copy = Object.assign({}, this.resident); // push delivers by reference, so we need to copy our object first
            this.residentsUsers.push(copy);
            
          }
          resolve();    
        })}
      )
    }
    /**works only when users are loaded to components */
    public getSelectedUser(selected:string[],names:string[][], user:resident[]|staff[]){
      let sel=null;
      
      for (var i=0; i<user.length; i++)
      {
        if(selected[1]=== user[i].id ){
          sel=user[i];
        }
      }
      return sel;
    }
    /** Update event types array in firestore database */
    updateEventTypes(types: ActivityTypes){
      this.eventTypesCollection.add(JSON.parse(JSON.stringify(types)));
    }
    
    /** get all event activity types */
    getEventTypes(){
      return new Promise(resolve=>{
        this.eventTypesCollection.valueChanges().subscribe(collection =>  {
          this.eventTypes = [];
          for (var i = 0; i < collection.length ; i++){
            this.eventType.color = collection[i].color;
            this.eventType.value = collection[i].value;
            this.eventType.viewValue = collection[i].viewValue;
            
            let copy = Object.assign({}, this.eventType); // push delivers by reference, so we need to copy our object first
            this.eventTypes.push(copy);
          }
          
          // Option #2 for adding new activity.
          this.eventType.viewValue = "הוסף אירוע חדש +"
          this.eventType.color = "white";
          this.eventType.value = "add";
          this.eventTypes.unshift(this.eventType)
          resolve();
        })}
      )
    }
    
    /** Adds a new Recurring Event to database */
    addRecurringEvent(recEvent: RecurringEvent): boolean{
      this.RecurringEventsCollection.add(JSON.parse(JSON.stringify(recEvent))).then().catch((err)=>{return false});
      return true;
    }
    
    /** Gets all Recurring Events from database */
    getrecurringEvents(){
      return new Promise(resolve=>{
        this.RecurringEventsCollection.valueChanges().subscribe(collection =>  {
          this.recurringEvents = [];
          for (var i = 0; i < collection.length ; i++){
            
            this.recurringEvent = JSON.parse(JSON.stringify(collection[i]))
            this.recurringEvent.id = this.recEventsList[i].id;
            this.recurringEvents.push(this.recurringEvent);
          }
           resolve();    
        })})
        
        
      }
      
      //**************************** TESTING FUNCTIONS ***************************** //
      storeAtFirestorme(){
        
        this.dataCollections.add({hi:"hi"});
        this.dc.add(JSON.parse(JSON.stringify(this.staff)));
        alert("Done");
      }
      
      
      getDataFromFirestome(){
        this.dc.valueChanges().subscribe(collection =>  {
          this.dbusers = "";
          for (var i = 0; i < collection.length ; i++){
            
            this.staff2.birthday = collection[i].birthday;
            this.staff2.calendarID = collection[i].calendarID;
            this.staff2.email = collection[i].email;
            this.staff2.firstName = collection[i].firstName;
            this.staff2.isActive = collection[i].isActive;
            this.staff2.lastName = collection[i].lastName;
            this.staff2.phoneNumber = collection[i].phoneNumber;
            this.staff2.role = collection[i].role;
            
            let copy = Object.assign({}, this.staff2); // push delivers by reference, so we need to copy our object first
            this.staffUsers.push(copy);
            
          }
          
          console.log(this.staffUsers);
          
        }
        
      )
      //console.log(this.dbusers);
      console.log(this.staff2);
    }
    /*
    getAll(){
      this.staffNames = [];
      
      this.staffCollection.valueChanges().subscribe(collection =>  {
        for (var i = 0; i < collection.length ; i++){
          this.staffNames[i] = collection[i].firstName + " " + collection[i].lastName;
        }
      }
    )
    //console.log(this.staffNames);
    
    return this.staffNames; 
  }
  */
  
  check(){
    this.setMetaData();
    this.getResidents();
    this.res = this.residentsUsers[0];
    let r:string;
    console.log(this.res);
    console.log(this.residentUsersList);
    console.log("=1=1=1=1=1==1")
    for (let i = 0; i < this.residentUsersList.length ; i++){
      console.log(this.residentUsersList[i].id);   
      
      if (this.residentUsersList[i].caretaker == this.res.caretaker){
        console.log("00000");
        
        console.log(this.residentUsersList[i].id);
        r = this.residentUsersList[i].id;
        this.res.birthday = "12/2/05";
        console.log("-1-");
        console.log(r);
        this.dc.doc(JSON.parse(JSON.stringify(r))).update(JSON.parse(JSON.stringify(this.res)));
        break;
        
      }
    }
    console.log(this.residentUsersList);   
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    this.dcTest.update({calendarID: "24"}); // Will change calendarID to 24
    this.getDataFromFirestome();
    //this.res = this.getResidents[1];
    //console.log(this.res);
    //this.res.birthday = "1/2/3";
    //this.res.caretaker = "None."
    //console.log(this.res);
    console.log("----");
    
    //console.log(this.residentsUsers);
    console.log("----");
    //this.res = this.residentsUsers[0];
    console.log(this.res);
    console.log("----");
    this.res.caretaker = "Danny";
    
    
    //this.res.caretaker = "Danny";
    
    //this.dcTest.update(JSON.parse(JSON.stringify(this.res)));
    //this.residentsCollection.doc("").update(JSON.parse(JSON.stringify(this.res))); // TESTEST
    
    //console.log(this.dcTest);
    return this.residentUsersList;
  }
  //**************************** TESTING FUNCTIONS ***************************** //
  
}



