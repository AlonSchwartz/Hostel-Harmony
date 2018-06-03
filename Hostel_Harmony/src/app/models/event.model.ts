export class CalEvent{
    constructor(
        public settime:{date:string,start:string,end:string},
        public asign: boolean, 
        public activity: string, 
        public describe: string,
        public issuer:string
    ){

    }
}
