import { Component, OnInit } from '@angular/core';
import {LeningService} from "../shared/lening.service";
import {AuthService} from "../../core/auth.service";
import {Lening} from "../shared/lening";
import {HardwareService} from "../../hardware/shared/hardware.service";
import * as _ from 'lodash';
import {UsersService} from "../../users/shared/users.service";

@Component({
  selector: 'lening-list',
  templateUrl: 'lening-list.component.html',
  styleUrls: ['lening-list.component.scss']
})
export class LeningListComponent implements OnInit {

  // Initialisatie
  showSpinner = true;
  allLeningen : any;

  constructor(private leningService: LeningService, private hardwareService: HardwareService, private userService: UsersService, private auth: AuthService) {
    // Haalt leningen op
    this.leningService.getLeningen().snapshotChanges().subscribe((lening) => {
      this.allLeningen = [];
      lening.forEach(elem => {
        let x = elem.payload.toJSON();
        x['$key'] = elem.key;
        this.allLeningen.push(x as Lening);
      })

      // Haalt user gegevens op van alle leningen
      auth.currentUserObservable.subscribe((user) => {
        // this.allLeningen.map(len => len.gebruikersId !== user.uid);
        for (let i = 0; i < this.allLeningen.length; i++){
          let hardwareid = this.allLeningen[i].hardware;
          this.hardwareService.getHardware(hardwareid).subscribe((hardware) => {
            this.allLeningen[i].hardware = hardware;
          })
          this.userService.getUser(this.allLeningen[i].gebruikersId).subscribe((user) => {
            this.allLeningen[i].gebruiker = user;
          })
        }
        this.showSpinner = false;
      })

    })



  }
  ngOnInit() {
  }
}
