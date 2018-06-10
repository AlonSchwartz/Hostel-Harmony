import { CalendarEvent } from "angular-calendar";

export class CalEvent{
    constructor(
        public settime:{start:string,end:string},
        public asign: boolean, 
        public activity: string, 
        public describe: string,
        public issuer:string
    ){
    }

}


export interface CALtest extends CalendarEvent{

    asign: boolean,
    issuer:string,
    activity?: string,
    describe?: string
    }