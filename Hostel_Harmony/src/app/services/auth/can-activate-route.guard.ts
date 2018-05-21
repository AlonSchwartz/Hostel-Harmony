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
  
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
  console.log(this.authService.isLoggedIn);

console.log(this.authService.firebaseAuth.auth.currentUser);

  console.log('you are authenticated'); 
if (this.authService.isLoggedIn == true){
 console.log("hi");
  return true;
}
  else
  console.log(this.authService.isLoggedIn);
  this.router.navigateByUrl('login')
  
}
 
}