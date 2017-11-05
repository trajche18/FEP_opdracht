import { Component } from '@angular/core';
import {AuthService} from "../../core/auth.service";
import { Router } from '@angular/router';
import {NavService} from "../shared/nav.service";

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {

  show = false;

  constructor(public auth: AuthService, public router: Router, private navService: NavService) { }

  toggleCollapse() {
    this.show = !this.show
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/user/login']);
  }

}
