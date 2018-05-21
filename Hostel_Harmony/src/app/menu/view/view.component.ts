import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @Input()//for getting name wanted
  name:string;
  constructor() { }

  ngOnInit() {
  }

}
