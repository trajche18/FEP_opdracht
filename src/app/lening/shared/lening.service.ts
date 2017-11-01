import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../core/auth.service';
import * as _ from 'lodash'

@Injectable()
export class LeningService {
    userRoles: Array<string>;

    constructor(private auth: AuthService,
                private db: AngularFireDatabase) {
        auth.user.map(user => {
            console.log(_.keys(_.get(user, 'roles')));
            /// Set an array of user roles, ie ['admin', 'author', ...]
            return this.userRoles = _.keys(_.get(user, 'roles'))
        })
            .subscribe()
    }

    /// Get Data
    getLeningen() {
        return this.db.list('leningen')
    }
    getLening(key) {
        return this.db.object('leningen/' + key)
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
    //// User Actions
    createLening(newData) {
        if ( this.canCreate ) {
            return this.db.object('leningen/' + lening.$key).update(newData)
        }
        else console.log('action prevented!')
    }

  // Create a bramd new item
  createItem(lening: Lening): void {
    if ( this.canCreate ) {
      this.itemsRef.push(item)
    }
    else console.log('action prevented!')
  }
    deletePost(key) {
        if ( this.canDelete ) {
            return this.db.list('leningen/' + key).remove()
        }
        else console.log('action prevented!')
    }

}
