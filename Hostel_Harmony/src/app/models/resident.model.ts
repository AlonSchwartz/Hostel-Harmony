export class resident {
    
    constructor(
        
        public firstName: string,
        public lastName: string,
        public phoneNumber: number, // Can be String - if we decide to have numbers in "05x-xxxxxxx" format. If it's a number type - cannot start with '0'.
        public isActive: boolean ,
        public birthday: string, // full birthday, like dd/mm/yyyy
        public calendarID: number = -1, // for future purpose. It needs to link to the user's calendar JSON file somehow (by index/server... TBD)
        public caretaker: string,
        public metaem:string,
        public memberSince: string, // Need to check this type... 
        public hasWork: boolean,
        //public hasLegalGuardian: boolean, // does this resident have Apotropus
        public contacts: {rel:string,name:string,phone:number}[],
        public work: {info:string,phone:number,location:string}, // only if hasWork is TRUE
        public doctors: {psych:string, gp:string}, // family doctor and 2nd doctor
        public className: string = "resident"

    ){};
    
};
