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
