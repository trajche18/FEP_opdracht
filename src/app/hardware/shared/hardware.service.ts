import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AuthService } from '../../core/auth.service';
import * as _ from 'lodash'
import { Observable } from 'rxjs/Observable';
import {Hardware} from './hardware';

@Injectable()
export class HardwareService {
  userRoles: Array<string>;
  itemsRef: AngularFireList<Hardware>;
  itemRef:  AngularFireObject<Hardware>;

  hardwares: Observable<Hardware[]>; //  list of objects
  hardware:  Observable<Hardware>;   //   single object
  constructor(private auth: AuthService,
              private db: AngularFireDatabase) {
    this.itemsRef = db.list('/hardware')

    auth.user.map(user => {
      console.log(_.keys(_.get(user, 'roles')));
      /// Set an array of user roles, ie ['admin', 'author', ...]
      return this.userRoles = _.keys(_.get(user, 'roles'))
    })
      .subscribe()
  }


  getHardwareList(query?) {
    return this.itemsRef = this.db.list('/hardware')
  }
  getHardwares(query?) {
    return this.itemsRef.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) )
    })
  }


  /// Get Data
  getHardware(key: string): Observable<Hardware> {
    const itemPath = 'hardware/' + key;
    this.hardware = this.db.object(itemPath).valueChanges();
    return this.hardware;
  }

/// Authorization Logic /////

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
    const allowed = ['beheerder']
    return this.matchingRole(allowed)
  }


  /// Helper to determine if any matching roles exist
  private matchingRole(allowedRoles): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
  }
  //// User Actions
  editHardware(hardware, newData) {
    if ( this.canEdit ) {
      return this.db.object('hardware/' + hardware.$key).update(newData)
    }
    else console.log('action prevented!')
  }
  /*
  deleteHardware(key) {
    if ( this.canDelete ) {
      return this.db.list('hardware/' + key).remove()
    }*/
  /*  else console.log('action prevented!')
  }*/
  createHardware(hardware: Hardware): void {
    this.itemsRef.push(hardware);
  }

}
