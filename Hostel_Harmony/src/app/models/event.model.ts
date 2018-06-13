import { CalendarEvent } from "angular-calendar";
import { ActivityTypes } from "./activity-types.model";
import { EventColor } from "calendar-utils";

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
    activity?: ActivityTypes,
    describe?: string,
    }