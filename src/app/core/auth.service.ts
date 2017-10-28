import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';


import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import {User} from "../users/user";



// export function createListValueChanges<T>(query: DatabaseQuery) {
//   return function valueChanges<T>(events?: ChildEvent[]): Observable<T[]> {
//     events = validateEventsArray(events);
//     return listChanges<T>(query, events!)
//       .map(changes => changes.map(change => {
//         console.log(changes)
//         const data = change.payload.snapshot!.val()
//         return  { $key: change.key, ...data }
//       }))
//   }
// }



@Injectable()
export class AuthService {

  userRef: AngularFireObject<any>;
  user: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {

    this.afAuth.authState
        .switchMap(auth => {
          if (auth) {
            /// signed in
            return this.db.object('users/' + auth.uid).valueChanges();
          } else {
            /// not signed in
            return Observable.of(null)
          }
        })
        .subscribe(user => {
          this.user.next(user);
        })
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.user.getValue() !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.user : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState
  }

// //  Returns current user UID
//   get currentUserId(): string {
//     return this.authenticated ? this.user.uid : '';
//   }

  // // Anonymous User
  // get currentUserAnonymous(): boolean {
  //   return this.authenticated ? this.user.isAnonymous : false
  // }

  //// Social Auth ////

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      })
      .catch(error => console.log(error));
  }


  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.user = user
      })
      .catch(error => console.log(error));
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.updateUserData(user)
      })
      .catch(error => console.log(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.updateUserData(user)
      })
      .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error))
  }


  //// Sign Out ////

  signOut(): void {
    this.afAuth.auth.signOut();
//    this.router.navigate(['/'])
  }


  //// Helpers ////

  private updateUserData(authData): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features
    const userData = new User(authData);
    const ref = this.db.object('users/' + authData.uid);
    ref.valueChanges().subscribe(user=> {
      user = user == null ? {} : user;
      if (!('roles' in user)) {
        ref.update(userData).catch(error => console.log(error));
      }
    })

    //   const path = `users/${this.currentUserId}`; // Endpoint on firebase
    //   const userRef: AngularFireObject<any> = this.db.object(path);
    //
    //   const data = {
    //     email: this.authState.email,
    //     name: this.authState.displayName
    //   }
    //
    //   userRef.update(data)
    //     .catch(error => console.log(error));
    //
    // }
  }




}
