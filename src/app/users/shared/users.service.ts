import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AuthService } from '../../core/auth.service'
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash'
import {User} from "./user";


@Injectable()
export class UsersService {
  private basePath = '/lening';

  usersRef: AngularFireList<User>;
  userRef:  AngularFireObject<User>;

  users: Observable<User[]>; //  list of objects
  user:  Observable<User>;   //   single object

  userRoles: Array<string>;
  constructor(private auth: AuthService,
              private db: AngularFireDatabase) {
    this.usersRef = this.db.list('users');
    auth.user.map(user => {
      // console.log(_.keys(_.get(user, 'roles')));
      /// Set an array of user roles, ie ['admin', 'author', ...]
      return this.userRoles = _.keys(_.get(user, 'roles'))
    })
        .subscribe()
  }

  getUsers() {
    return this.db.list('users')
  }

  /// Get Data
  getUser(key: string): Observable<User> {
    const itemPath = 'users/' + key;
    return this.db.object(itemPath).valueChanges();
  }


  ///// Authorization Logic /////

  get canRead(): boolean {
    const allowed = ['beheerder'];
    return this.matchingRole(allowed);
  }
  get canEdit(): boolean {
    const allowed = ['beheerder'];
    return this.matchingRole(allowed);
  }
  get canDelete(): boolean {
    const allowed = ['beheerder']
    return this.matchingRole(allowed)
  }
  get canCreate(): boolean {
    const allowed = ['beheerder', 'gebruiker']
    return this.matchingRole(allowed)
  }

  /// Helper to determine if any matching roles exist
  private matchingRole(allowedRoles): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
  }

  // // Create a bramd new item
  // createLening(lening: Lening): void {
  //   if ( this.canCreate ) {
  //     this.leningenRef.push(lening)
  //   }
  //   else console.log('action prevented!')
  // }
  // deleteLening(key) {
  //   if ( this.canDelete ) {
  //     return this.db.list('leningen/' + key).remove()
  //   }
  //   else console.log('action prevented!')
  // }
  //
  // editLening(lening, newData) {
  //   if ( this.canEdit ) {
  //     return this.db.object('leningen/' + lening.$key).update(newData)
  //   }
  //   else console.log('action prevented!')
  // }
}
