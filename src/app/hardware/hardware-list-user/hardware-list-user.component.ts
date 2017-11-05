import { Component, OnInit } from '@angular/core';
import {Hardware} from "../shared/hardware";
import {HardwareService} from "../shared/hardware.service";
import { Observable } from 'rxjs/Observable';
import {LeningService} from "../../lening/shared/lening.service";
import {AuthService} from "../../core/auth.service";
import {Lening} from "../../lening/shared/lening";
import {element} from "protractor";
import * as _ from 'lodash';

@Component({
  selector: 'hardware-list-user',
  templateUrl: './hardware-list-user.component.html',
  styleUrls: ['./hardware-list-user.component.scss']
})
export class HardwareListUserComponent implements OnInit {
  hardwares = [];
  showSpinner = true;
  allLeningen : any;

  constructor(private hardwareService: HardwareService, private leningService: LeningService, private auth : AuthService) {
    this.leningService.getLeningen().snapshotChanges().subscribe((lening) => {
      this.allLeningen = [];
      lening.forEach(elem => {
        let x = elem.payload.toJSON();
        x['$key'] = elem.key;
        this.allLeningen.push(x as Lening);
      })
      // Leningen van de ingelogde user ophalen
      auth.currentUserObservable.subscribe((user) => {
        // this.allLeningen.map(len => len.gebruikersId !== user.uid);
        this.allLeningen = _.filter(this.allLeningen, function (o) { return o.gebruikersId === user.uid;});
        for (let i = 0; i < this.allLeningen.length; i++){
          let hardwareid = this.allLeningen[i].hardware;
          hardwareService.getHardware(hardwareid).subscribe((hardware) => {
            this.hardwares.push(hardware);
          })
        }
        this.showSpinner = false;
      });
    })

  }
  ngOnInit() {
  }

}
