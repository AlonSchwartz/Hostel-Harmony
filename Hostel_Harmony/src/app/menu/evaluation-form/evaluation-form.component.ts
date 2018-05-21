import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})
export class EvaluationFormComponent implements OnInit {
  @Input()//for getting name wanted
  name:string;
  constructor() { }

  ngOnInit() {
  }

}
