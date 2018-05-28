import { Component, OnInit,Input } from '@angular/core';
import { EvalForm} from '../../models/eval-form.model'
import {NgModel,FormGroup,FormArray,FormBuilder ,FormControl} from '@angular/forms';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})
export class EvaluationFormComponent implements OnInit {
  @Input()//for getting name wanted
  name:string;
  myForm: FormGroup;
  private model: EvalForm ;
  private submitted: boolean;
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  constructor(private fb:FormBuilder ) {
    this.submitted = false;
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
  }
  public buildSemiGoal(val: string) {
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
  subGoal(obj:object) {
    this.submitted = true;/*do something*/
    alert(this.submitted);
    console.log(obj);
    //add to database!
  }

}
