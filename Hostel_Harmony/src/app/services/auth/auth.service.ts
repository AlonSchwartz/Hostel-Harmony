import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '@firebase/auth-types';
import { BehaviorSubject }  from 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()
export class AuthService{
  
  private isUserLoggedIn;
  public username;
  redirectUrl: string;
  
  private _user:User
  private _userData: any;
  
  loggedIn = new BehaviorSubject<boolean>(false);
  
  
  
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) { 
    
    
    this.firebaseAuth.authState.subscribe((_user) => {
      if (_user){
        
        this.loggedIn.next(true);
        if (this.redirectUrl)
        {
          this.router.navigate([this.redirectUrl]);
        }
        else
        {
          this.loggedIn.next(false);
        }
      } 
    }
  )
  
}

public async loginWithEmailAndPassword(email: string, pass: string) {
  
  
  let user = await this.firebaseAuth.auth.signInWithEmailAndPassword(email, pass)
  this._user = this.firebaseAuth.auth.currentUser
  
}

public async signupWithEmailAndPass(email: string, pass: string) {
  await this.firebaseAuth.auth.createUserWithEmailAndPassword(email, pass)
}


logout() {
  this.firebaseAuth.auth.signOut();
}

public get isLoggedIn() {
  
  return this.firebaseAuth.auth.currentUser != null;
}

}