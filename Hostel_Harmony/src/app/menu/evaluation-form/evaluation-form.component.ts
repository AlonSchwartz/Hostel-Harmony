import { Component, OnInit,Input, SimpleChange } from '@angular/core';
import { EvalForm} from '../../models/eval-form.model'
import {NgModel,FormGroup,FormArray,FormBuilder ,FormControl} from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { NameSelectService } from '../../services/nameSelect/name-select.service';
import { resident } from '../../models/resident.model';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})
export class EvaluationFormComponent implements OnInit {
  @Input()//for getting name wanted
  name:string;
  myForm: FormGroup;
  pageMode:string;
  private model: EvalForm ;
  btnview:boolean;
  resident:resident;
  copy:resident;

  constructor(private fb:FormBuilder, private userService: UserService, private nameSel: NameSelectService ) {
   
    this.model = new EvalForm(
      '', 
      '',
      [this.buildSemiGoal('').value]
    );
  }
  ngOnInit() {
    this.btnview=false;
    this.nameSel.feval.subscribe(resident => this.resident = resident);

    this.copy = Object.assign({}, this.resident);
    this.pageMode = "viewMode"; 
    this.enterExistingEvents(this.resident.evals[0])

    this.myForm = this.fb.group({
      semiGoal: this.fb.array(
        [this.buildSemiGoal('')])
    })
  }
  ngOnChanges(changes:{[propKey:string]:SimpleChange}){
    for(let na in changes){
      let rec=changes[na];
      let temp=JSON.stringify(rec.currentValue);
      if(!rec.isFirstChange()){
        this.nameSel.feval.subscribe(resident => this.resident = resident);
        this.copy = Object.assign({}, this.resident);
        this.enterExistingEvents(this.resident.evals[0])
      }
    }
  }
  public buildSemiGoal(val: any) {
    return new FormGroup({
      goal:new FormControl(val),
      acts:this.fb.array(
        [this.buildActs(val)]
      ),
      how:new FormControl(val),

    })
  }
  public buildActs(val: string) {
    return new FormGroup({
        action:new FormControl(val),
        caretaker: new FormControl(val),
      })
    
  }
 
  /**enter existing values in form */
  public enterExistingEvents(value:any):void{
    this.model.mainGoal=value.mainGoal;
    this.model.name=value.name=this.name;
    for( let i=0;i<value.semiGoal.length;i++){
      this.model.semiGoal[i]=value.semiGoal[i];
      console.log(this.model.semiGoal[i])
    }
  }
  subGoal() {
    this.btnview=false;
    Object.assign(this.resident.evals[0],this.model);
    this.userService.update(this.resident)
     this.pageMode = "viewMode";
  }
  edit():void
  {
    this.btnview=true;
    this.pageMode = "editMode";
  }
  
  cancelEdit() : void {
    this.btnview=false;
    Object.assign(this.resident,this.copy);
    this.pageMode = "viewMode";
  }
}
