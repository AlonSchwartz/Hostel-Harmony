export class EvalForm{
    constructor(
        public name: string,
        public mainGoal: string,
        public semiGoal:{
            goal:String,
            acts:{
                action:string,
                caretaker:string
            }[],
            how:string
        }[] 
    ){

    }
}