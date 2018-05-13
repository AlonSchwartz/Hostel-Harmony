export class person{
    
    // Some basic att that are common of staff & residents
    firstName: string;
    lastName: string;
    phoneNumber: number; // Can be String - if we decide to have numbers in "05x-xxxxxxx" format. If it's a number type - cannot start with '0'.
    isActive: boolean = true;
    birthday: string; // full birthday, like dd/mm/yyyy
    calendarID: number = -1; // for future purpose. It needs to link to the user's calendar JSON file somehow (by index/server... TBD)
    
    
    
    constructor(){}
}
