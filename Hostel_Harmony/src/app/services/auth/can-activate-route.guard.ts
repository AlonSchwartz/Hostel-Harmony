import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from '@angular/router';
import { Observable,Observer ,Subject} from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions} from '@angular/http';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CanActivateRouteGuard{
  
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    //console.log("First check");
    if (this.authService.isLoggedIn == true){
      console.log('hi, you are authenticated');  
      return true;
    }
    this.authService.redirectUrl = state.url;    
    console.log("You're not logged in, so you're going to Login page!");
    //this.router.navigateByUrl('login')
    return false;
    
  }
  
  
}