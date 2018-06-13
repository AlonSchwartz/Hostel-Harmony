import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'dialogPopup',
    templateUrl: 'dialogPopup.component.html',
  })
  export class dialogPopup {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
 
 test(data:any){

  console.log(data)
 }

  }

