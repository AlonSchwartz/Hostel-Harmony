import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NameSelectService} from '../service/New folder/name-select.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  users:string[]=['עמית','ויסאם','אלחנן','אלון','בן'];
  
  constructor(private router: Router,private data:NameSelectService){}
  message:string;
  navigateTo(value) {
      if (value) {
          this.router.navigate([value]);
      }
      return false;
  }
  ngOnInit() {
    this.data.cm.subscribe(message =>this.message=message);
  }
  sendVal(selval:string){
    this.data.changeMessage(selval);
  }

}
