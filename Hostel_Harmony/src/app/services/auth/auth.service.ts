import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '@firebase/auth-types';
import { Http,Headers,Response,RequestOptions} from '@angular/http';
import {Observable, BehaviorSubject }  from 'rxjs/Rx';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { Router } from '@angular/router';

@Injectable()
export class AuthService{
  
  private isUserLoggedIn;
  public username;
  redirectUrl: string;

  
  
  /*
  setUserLoggedIn(){
    this.isUserLoggedIn=true;
    this.username='';
  }
  
  getUserLoggedIn(){
    return this.isUserLoggedIn;
  }
  */
  private _user:User
  private _userData: any;
  
  loggedIn = new BehaviorSubject<boolean>(false);
  
  
  //public redirectUrl:string;
  
  
  //user: Observable<firebase.User>;
  
  
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) { 
    //this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    //    this.firebaseAuth.auth.signInAnonymously();
    //this.isUserLoggedIn = false;
    
    console.log("I'm in auth service");
    
    this.firebaseAuth.authState.subscribe((_user) => {
      if (_user){
        console.log("user exists");
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
  
  // this.user = firebaseAuth.authState;
}


// public isLoggedin():Observable<boolean>{
//   return this._http.get(process.env.api_url +'/api/login')
// .map((res:Response)=>res)
//.catch((error:any )=>Observable.throw(Error|| 'Server Error'))
//}

public async loginWithGoogle() {
  //let user = await this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  this.firebaseAuth.auth.signInAnonymously();
  
  //this._user = this.firebaseAuth.auth.currentUser
  
  
  // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
  //   this._user = this.afAuth.auth.currentUser
  // }).catch(err => {
  //   throw new Error("Auth error");
  // })
  // console.log(this._user)
  
}

public async loginWithEmailAndPassword(email: string, pass: string) {
  console.log(email);
  console.log(pass);
  
  let user = await this.firebaseAuth.auth.signInWithEmailAndPassword(email, pass)
  this._user = this.firebaseAuth.auth.currentUser
  console.log("successfully\n ");
  console.log(user);
}

public async signupWithEmailAndPass(email: string, pass: string) {
  await this.firebaseAuth.auth.createUserWithEmailAndPassword(email, pass)
}

/*  
signup(email: string, password: string) {
  this.firebaseAuth
  .auth
  .createUserWithEmailAndPassword(email, password)
  .then(value => {
    console.log('Success!', value);
  })
  .catch(err => {
    console.log('Something went wrong:',err.message);
  });    
}

login(email: string, password: string) {
  this.firebaseAuth
  .auth
  .signInWithEmailAndPassword(email, password)
  .then(value => {
    console.log('Nice, it worked!');
  })
  .catch(err => {
    console.log('Something went wrong:',err.message);
  });
}
*/

logout() {
  this.firebaseAuth.auth.signOut();
}

public get isLoggedIn() {
  console.log("Im in logged in function\n");
  return this.firebaseAuth.auth.currentUser != null;
}

}