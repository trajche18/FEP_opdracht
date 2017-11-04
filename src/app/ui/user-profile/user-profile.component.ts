import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

import * as _ from 'lodash';
import {User} from "../../users/shared/user";

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userInfo = {};

  constructor(public auth: AuthService, public router: Router) {
    auth.user.map(user => {
      if(user != null && user.studentnummer === "") {
        this.router.navigate(['/user/profile'])
      }
      return this.userInfo = _.assign(this.userInfo, user);
    }).subscribe()

    auth.currentUserObservable.subscribe((user) => {
      if(user != null)
        this.userInfo = _.assign(this.userInfo,{'uid': user.uid});
    });
  }

  ngOnInit() {
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/user/login']);
  }

}
