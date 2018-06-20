import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dialogPopup',
  templateUrl: 'dialogPopup.component.html',
})
export class dialogPopup {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService:UserService,public router: Router) {}
  
  
  deleteEvent(dataID:string){
    
    var answer = confirm("אירוע זה ימחק לצמיתות! האם אתה בטוח?")
    if (answer){console.log("hi")
      if (this.userService.deleteRecurringEvent(dataID) == true){
        alert("האירוע נמחק בהצלחה");
        this.router.navigateByUrl('/')
      }
    }
  }
}



