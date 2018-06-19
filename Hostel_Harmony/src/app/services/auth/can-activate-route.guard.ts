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
    if (this.authService.isLoggedIn == true){  
      return true;
    }
    this.authService.redirectUrl = state.url;    
    //this.router.navigateByUrl('login')
    return false;
    
  }
  
  
}