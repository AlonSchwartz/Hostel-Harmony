import { CalEvent, CALtest } from '../models/event.model';


export class staff {
    
    constructor(
        public firstName: string,
        public lastName: string,
        public phoneNumber: number, // Can be String - if we decide to have numbers in "05x-xxxxxxx" format
        public isActive: boolean = true,
        public birthday: string, // full birthday, like dd/mm/yyyy
        public calendarID: number = -1, // for future purpose. It needs to link to the user's calendar JSON file somehow (by index/server... TBD)
        public email: string,
        public role: string,
        public className: string = "staff",
        public events?: CALtest[],
        public id?: string
    )
    {};
    
  
}
