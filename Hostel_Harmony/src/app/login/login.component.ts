import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { test } from '../models/test.model';
import { resident } from '../models/resident.model';
import { staff } from '../models/staff.model';
import { Router ,RouterEvent} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  pass:string;

  public wrongPass:boolean;
  emailErr = new FormControl('', [Validators.required, Validators.email]);
  getEmailErrorMessage() {
    return this.emailErr.hasError('required') ? 'הכנס כתובת אימייל' :
    this.emailErr.hasError('email') ? 'כתובת אימייל לא נכונה' :
    '';
  }
  constructor(public authService: AuthService, public router: Router) { }
  
  async login(){  
    await this.authService.loginWithEmailAndPassword(this.email,this.pass).then((res)=>{this.router.navigateByUrl('menu');}).catch((err)=>this.wrongPass=true);
      
  }

  ngOnInit() { 
    this.wrongPass=false;   
    this.email=null;
    this.pass=null;
    if (this.authService.isLoggedIn){
      this.router.navigate(['/menu']);
      console.log("needs to nav to menu");
    }
  } 
}

