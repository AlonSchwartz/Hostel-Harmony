export class Event{
    constructor(
        public settime:{date:number,start:number,end:number},
        public asign: boolean, 
        public activity: string, 
        public describe: string,
        public issuer:string
    ){

    }
}
