import { Component, OnInit,Input, SimpleChange, OnChanges } from '@angular/core';
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
export class EvaluationFormComponent implements OnInit,OnChanges {
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
    this.myForm = this.fb.group({
      semiGoal: this.fb.array(
        [this.buildSemiGoal('')])
    })
    this.btnview=false;
    this.nameSel.feval.subscribe(resident => this.resident = resident);
    this.copy = Object.assign({}, this.resident);
    this.pageMode = "viewMode";
    if(this.resident.evals.length==0){
      this.resident.evals.push(this.model)
    } 
      this.enterExistingEvents(this.resident.evals[0])
  }
  ngOnChanges(changes:{[propKey:string]:SimpleChange}){
    for(let na in changes){
      let rec=changes[na];
      let temp=JSON.stringify(rec.currentValue);
      if(!rec.isFirstChange()){
        this.nameSel.feval.subscribe(resident => this.resident = resident);
        this.copy = Object.assign({}, this.resident);
        if(this.resident.evals.length==0){
          this.resident.evals.push(this.model)
        } 
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
  public editSemiGoal(go: any,ac:FormArray,ho) {
    return new FormGroup({
      goal:new FormControl(go),
      acts: ac,
      how:new FormControl(ho),

    })
  }
  public editActs(act) {
    return new FormGroup({
        action:new FormControl(act.action),
        caretaker: new FormControl(act.caretaker),
      })
    
  }
  /**enter existing values in form */
  public enterExistingEvents(value:any):void{
    this.model.mainGoal=value.mainGoal;
    this.model.name=value.name=this.name;
    //empty my form
    this.myForm= this.fb.group({
      semiGoal: this.fb.array(
        [])
    });
    const sg=this.myForm.get('semiGoal') as FormArray;
    /**set nested array--------------------------- */
    let ac =this.fb.group({
      acts: this.fb.array(
        [])
    });;
    const temp=ac.get('acts') as FormArray; 
    /**-----enter details in outer/inner array----------- */
    for( let i=0;i<value.semiGoal.length;i++){
      this.model.semiGoal[i]=value.semiGoal[i];
      for( let j=0;j<value.semiGoal[i].acts.length;j++){
        this.model.semiGoal[i].acts[j]=value.semiGoal[i].acts[j];
        temp.push(this.editActs(
          this.model.semiGoal[i].acts[j]
        ))
      }
      sg.push(this.editSemiGoal(
        this.model.semiGoal[i].goal,
        temp,
        this.model.semiGoal[i].how)
      )
      temp.removeAt(i) 
    } 
  }
  get checkSizeSem(){
    return (this.model.semiGoal.length>1);
  }
  get checkSizeAct(){
    for(let i=0;i<this.model.semiGoal.length;i++)
    return (this.model.semiGoal[i].acts.length>1);
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
