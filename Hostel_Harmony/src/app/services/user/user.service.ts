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
    this.staff = new staff("","",6535, true, "", 2, "", "");
    this.staff2 = new staff("","",-1, true, "", -1, "", "","staff",[]);
    this.resident = new resident("","",-1,true,"",-1,"","","",false,[],{info:null, phone:null, location:null},
    {psych:null,gp:null},"resident");
    
    this.res = new resident("","",-1,true,"",-1,"","","",false,[],{info:null, phone:null, location:""},
    {psych:null,gp:null},"resident");
    
    this.residentsUsers = [
      
    ];
    
    this.staffUsers = [
      new staff("","",6535, true, "", 2, "", ""), // According to staff.option #2
    ];
    
    this.eventType = new ActivityTypes("", "", "");
    this.recurringEvent = {title:"", describe:"",color:"", rrule:{bymonth:-1,bymonthday:-1,freq:RRule.YEARLY }}
    
    //  Calling these functions to initilize them
    this.setMetaData();
    this.setStaffMetaData();
    this.getResidents();
    this.setRecEventsMetaData()
    this.getrecurringEvents();
    
    
  }
  
  
  /** Receives a resident/staff object and adds it to the relevant database. */
  addToDatabase(per: resident | staff){
    console.log("--------")
    if (per.className == "resident"){
      this.residentsCollection.add(JSON.parse(JSON.stringify(per)));
    }
    
    if (per.className == "staff"){
      this.staffCollection.add(JSON.parse(JSON.stringify(per)));      
    }
  }
  
  /** Adds evaluation form to relevant resident object */
  addEvalForm(selResident: resident, evalForm: EvalForm){
    selResident.evals.push(evalForm);
    this.residentsCollection.doc(JSON.parse(JSON.stringify(selResident.id))).update(JSON.parse(JSON.stringify(selResident)));
  }
  
  /** Adds a new event to resident/staff */
  addEvent(per: resident | staff, event: CALtest ): boolean{
    this.setMetaData();
    
    if (per.className == "resident"){
      
      this.getResidents();
      this.res = this.residentsUsers[0];   
      if (this.feasibilityCheck(event,per)){
        for (let i = 0; i < this.residentUsersList.length ; i++){        
          if (this.residentUsersList[i].id == per.id){
            per.events.push(event);
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
      
      if (this.feasibilityCheck(event,per)){
        for (let i = 0; i < this.staffUsersList.length ; i++){        
          if (this.staffUsersList[i].id == per.id){
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
          let answer = confirm("האירוע שהינך מנסה להוסיף חופף עם אירוע אחר. לתאם בכל זאת? \n פרטי האירוע: " + per.events[i].title + "\n משעה: " + per.events[i].start.getHours() + ":" + per.events[i].start.getMinutes() + " עד שעה: " + per.events[i].end.getHours() + ":" + per.events[i].end.getMinutes())
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
          let answer = confirm("האירוע שהינך מנסה להוסיף חופף עם אירוע אחר. לתאם בכל זאת? \n פרטי האירוע: " + per.events[i].title + "\n משעה: " + per.events[i].start.getHours() + ":" + per.events[i].start.getMinutes() + " עד שעה: " + per.events[i].end.getHours() + ":" + per.events[i].end.getMinutes())
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
          this.residentsCollection.doc(JSON.parse(JSON.stringify(per.id))).update(JSON.parse(JSON.stringify(per))).catch(function(error){console.log(error)});
        }
      }
    }
    
    if (per.className == "staff"){
      for (let i = 0; i < this.staffUsersList.length ; i++){        
        if (this.staffUsersList[i].id == per.id){
          this.staffCollection.doc(JSON.parse(JSON.stringify(per.id))).update(JSON.parse(JSON.stringify(per))).catch(function(error){console.log(error)});
        }
      }
    }
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
      
      deleteRecurringEvent(id:string): boolean{
        this.RecurringEventsCollection.doc(JSON.parse(JSON.stringify(id))).delete();
        return true;
        
      }
      
      /** Deletes resident/staff from DB */
      deletePerson(id:string, classID:string): boolean{
      
        if (classID == "resident"){
          this.residentsCollection.doc(JSON.parse(JSON.stringify(id))).delete();
        }
        
        if (classID == "staff"){
          this.staffCollection.doc(JSON.parse(JSON.stringify(id))).delete();
        }
        
        return true;
        
      }
    }
    
    
    
    