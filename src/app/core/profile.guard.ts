import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "./auth.service";
import * as _ from 'lodash';

@Injectable()
export class ProfileGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | boolean | Promise<boolean> {

    return this.auth.user
        .take(1)
        .map(user => _.get(user, 'studentnummer') != '')
        .do(authorized => {
          //console.log(authorized);
          if (!authorized) {
            this.router.navigate(['/user/profile']);
          }
        })

  }
}
