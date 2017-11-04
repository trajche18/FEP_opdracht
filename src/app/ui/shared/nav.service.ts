import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AuthService } from '../../core/auth.service';
import * as _ from 'lodash'
import { Observable } from 'rxjs/Observable';


@Injectable()
export class NavService {
  userRoles: Array<string>;

  constructor(private auth: AuthService,
              private db: AngularFireDatabase) {
    auth.user.map(user => {
      /// Set an array of user roles, ie ['admin', 'author', ...]
      return this.userRoles = _.keys(_.get(user, 'roles'))
    })
        .subscribe()
  }

  /// Authorization Logic /////

  get isBeheerder(): boolean {
    const allowed = ['beheerder'];
    return this.matchingRole(allowed);
  }

  get isGebruiker(): boolean {
    const allowed = ['gebruiker'];
    return this.matchingRole(allowed);
  }

  /// Helper to determine if any matching roles exist
  private matchingRole(allowedRoles): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
  }


}
