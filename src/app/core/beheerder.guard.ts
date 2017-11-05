import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "./auth.service";

import * as _ from 'lodash';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class BeheerderGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean | Promise<boolean> {

    return this.auth.user
        .take(1)
        .map(user => _.has(_.get(user, 'roles'), 'beheerder'))
        .do(authorized => {
          if (!authorized) {
            console.log('route prevented!')
            //  this.router.navigate(['/']);
          }
        })

  }
}
