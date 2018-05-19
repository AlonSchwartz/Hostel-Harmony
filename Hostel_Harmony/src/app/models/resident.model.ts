import { person } from "./person.model";

/*
//  option #1
export class resident extends person {
    
    public caretaker: string;
    public memberSince: Date; // Need to check this type... 
    public hasWork: boolean;
    public hasLegalGuardian: boolean; // does this resident have Apotropus
    public contacts: contact[];
    public work: work; // only if hasWork is TRUE
    public doctors: string[]; // family doctor and 2nd doctor
    
    //rehabilitationProgram // Not sure if we're gonna implement this, and how (by link to external url / internal photo / form etc)
    //gender: string; // not sure if needed
    
    constructor(values:ngModel){ // values should be from the type of the forms input.
        super();
        this.birthday = values.birthday;
        this.caretaker = values.caretaker;
        this.work = values.work;
        this.lastName = values.lastName;
        //etc...
    };
}
*/



//  option #2, without person + bit different
import {FormArray} from "@angular/forms";
export class resident {
    
    //rehabilitationProgram // Not sure if we're gonna implement this, and how (by link to external url / internal photo / form etc)
    //gender: string; // not sure if needed
    
    constructor(
        
        public firstName: string,
        public lastName: string,
        public phoneNumber: number, // Can be String - if we decide to have numbers in "05x-xxxxxxx" format. If it's a number type - cannot start with '0'.
        public isActive: boolean ,
        public birthday: string, // full birthday, like dd/mm/yyyy
        public calendarID: number = -1, // for future purpose. It needs to link to the user's calendar JSON file somehow (by index/server... TBD)
        public caretaker: string,
        public memberSince: string, // Need to check this type... 
        public hasWork: boolean,
        //public hasLegalGuardian: boolean, // does this resident have Apotropus
        public contacts: {rel:string,name:string,phone:number}[],
        public work: {info:string,phone:number,location:string}, // only if hasWork is TRUE
        public doctors: {psych:string, gp:string} // family doctor and 2nd doctor
    ){};
    
};

class contact {
    
    firstName: string;
    lastName: string;
    phoneNumber: string;
    relationship: string;
}

class work {
    
    name: string;
    phoneNumber: string;
    address: string;
    
}