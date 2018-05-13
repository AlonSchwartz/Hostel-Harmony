import { person } from "./person.model";

/*
export class staff extends person {
    email: string;
    role: string;
    
    constructor(values:ngModel){ // values should be from the type of the forms input.
        super();
        this.birthday = values.birthday;
        this.email = values.email;
        //etc...
    };
    
}


*/


// Like option #2 in resdient
export class staff {
    
    constructor(
        public firstName: string,
        public lastName: string,
        public phoneNumber: number, // Can be String - if we decide to have numbers in "05x-xxxxxxx" format
        public isActive: boolean = true,
        public birthday: string, // full birthday, like dd/mm/yyyy
        public calendarID: number = -1, // for future purpose. It needs to link to the user's calendar JSON file somehow (by index/server... TBD)
        public email: string,
        public role: string
        
    )
    {};
}
