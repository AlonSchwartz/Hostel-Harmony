import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NameSelectService} from '../services/nameSelect/name-select.service';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router,private data:NameSelectService) { }
  name:string;
  current = new Date()
  staff:string[]=['עמית','ויסאם','אלחנן','אלון','בן'];
  residents:string[]=['דייר 1','דייר 2','דייר 3','דייר 4','דייר 5'];
  navigateTo(value) {
    if (value) {
      this.router.navigate([value]);
    }
    return false;
  }
  ngOnInit() {
    this.data.cm.subscribe(message =>this.name=message);
  }
  sendVal(selval:string){
    this.data.changeMessage(selval);
  }

}
