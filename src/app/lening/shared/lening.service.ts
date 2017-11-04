import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AuthService } from '../../core/auth.service'
import { Lening } from './lening';;
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash'

@Injectable()
export class LeningService {
  private basePath = '/lening';

  leningenRef: AngularFireList<Lening>;
  leningRef:  AngularFireObject<Lening>;

  leningen: Observable<Lening[]>; //  list of objects
  lening:  Observable<Lening>;   //   single object

  blokken = ['Blok A', 'Blok B', 'Blok C', 'Blok D', 'Blok E']
  get alleBlokken(): Array<string> {
    return this.blokken;
  }


  nextBlok(gekozenBlok){
    for(let i = 0; i<this.blokken.length; i++) {
      console.log(i);
      if(this.blokken.length-1 == i){
        return this.blokken[0];
      }
      if(this.blokken[i] === gekozenBlok) {
        return this.blokken[i+1];
      }
    }
  }

  userRoles: Array<string>;
    constructor(private auth: AuthService,
                private db: AngularFireDatabase) {
      this.leningenRef = this.db.list('leningen');
        auth.user.map(user => {
            // console.log(_.keys(_.get(user, 'roles')));
            /// Set an array of user roles, ie ['admin', 'author', ...]
            return this.userRoles = _.keys(_.get(user, 'roles'))
        })
            .subscribe()
    }

  getLeningenList(query?) {
    // const itemsRef = afDb.list('/items')
    // return this.itemsRef.valueChanges()
    return this.leningenRef.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) )
    })
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
        const allowed = ['beheerder', 'gebruiker'];
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


    // Create a bramd new item
  createLening(lening: Lening): void {
    if ( this.canCreate ) {
      this.leningenRef.push(lening)
    }
    else console.log('action prevented!')
  }
    deleteLening(key) {
        if ( this.canDelete ) {
            return this.db.list('leningen/' + key).remove()
        }
        else console.log('action prevented!')
    }

  editLening(lening, newData) {
    if ( this.canEdit ) {
      return this.db.object('leningen/' + lening.$key).update(newData)
    }
    else console.log('action prevented!')
  }
}
