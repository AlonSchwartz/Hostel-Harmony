export class addResident{
    constructor(
        public name: string, 
        public surname: string, 
        public phone: number,
        public emergency:{rel:string, name:string,phone:number },
        public age: string,//todo: change
        public assigned: string,
        public work:{info:string,phone:number,location:string},
        public doctor: {psych:string, gp:string}
    ){

    }
}
