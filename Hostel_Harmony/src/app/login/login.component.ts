import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { test } from '../models/test.model';
import { resident } from '../models/resident.model';
import { staff } from '../models/staff.model';
import { Router ,RouterEvent} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email:string;
  pass:string;
  
  constructor(public authService: AuthService, public router: Router) { }
  
  async login(){
    await this.authService.loginWithEmailAndPassword(this.email, this.pass)
    this.router.navigateByUrl('menu');
    
  }
  
  ngOnInit() {
    this.email=null;
    this.pass=null;
    /** Caused a crash in routing! */
  //   this.router.resetConfig([
      
  //   ])
   }
  
}
