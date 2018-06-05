import { Component, OnInit,Input } from '@angular/core';
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
  private model: EvalForm ;
  private submitted: boolean;
  resident:resident;
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  constructor(private fb:FormBuilder, private userService: UserService, private nameSel: NameSelectService ) {
    this.submitted = false;
    this.model = new EvalForm(
      '', 
      '',
      [this.buildSemiGoal('').value]
    );
  }
  ngOnInit() {
    this.nameSel.feval.subscribe(resident => this.resident = resident);
    console.log(this.resident);
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
    this.userService.addEvalForm(this.resident,this.model)// Not working for all of the residents now because not all of them have eval field in firebase
    alert("תוכנית שיקום נוספה בהצלחה")
    
  }

}
