import { Component, OnInit } from '@angular/core';
import {HardwareService} from "../../hardware/shared/hardware.service";
import {LeningService} from "../shared/lening.service";
import {AuthService} from "../../core/auth.service";
import {Lening} from "../shared/lening";
import * as _ from 'lodash';
import {UsersService} from "../../users/shared/users.service";

@Component({
  selector: 'lening-list-user',
  templateUrl: './lening-list-user.component.html',
  styleUrls: ['./lening-list-user.component.scss']
})
export class LeningListUserComponent implements OnInit {
  hardwares = [];
  showSpinner = true;
  allLeningen : any;

  constructor(private hardwareService: HardwareService, private leningService: LeningService, private auth : AuthService, private userService: UsersService) {
    this.leningService.getLeningen().snapshotChanges().subscribe((lening) => {
      this.allLeningen = [];
      lening.forEach(elem => {
        let x = elem.payload.toJSON();
        x['$key'] = elem.key;
        this.allLeningen.push(x as Lening);
      })
      auth.currentUserObservable.subscribe((user) => {
        // this.allLeningen.map(len => len.gebruikersId !== user.uid);
        this.allLeningen = _.filter(this.allLeningen, function (o) { return o.gebruikersId === user.uid;});
        for (let i = 0; i < this.allLeningen.length; i++){
          let hardwareid = this.allLeningen[i].hardware;
          hardwareService.getHardware(hardwareid).subscribe((hardware) => {
            this.allLeningen[i].hardware = hardware;
          })
          this.userService.getUser(this.allLeningen[i].gebruikersId).subscribe((user) => {
            this.allLeningen[i].gebruiker = user;
          })
        }
        this.showSpinner = false;
      });
    })
  }

  ngOnInit() {
  }

}
