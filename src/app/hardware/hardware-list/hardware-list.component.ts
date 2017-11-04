import { Component, OnInit } from '@angular/core';
import {Hardware} from "../shared/hardware";
import {HardwareService} from "../shared/hardware.service";
import { Observable } from 'rxjs/Observable';
import {LeningService} from "../../lening/shared/lening.service";
import {AuthService} from "../../core/auth.service";
import {Lening} from "../../lening/shared/lening";

@Component({
  selector: 'hardware-list',
  templateUrl: './hardware-list.component.html',
  styleUrls: ['./hardware-list.component.scss']
})
export class HardwareListComponent implements OnInit {
  hardwares: any
  showSpinner = true;
  allLeningen : any;

  constructor(private hardwareService: HardwareService, private leningService: LeningService, private auth: AuthService) {
    this.hardwares = this.hardwareService.getHardwares()

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
            console.log(this.allLeningen[i]);
          })

        }
      })

    })

  }
  ngOnInit() {
   this.hardwares.subscribe(x => {
     this.showSpinner = false
    })
  }
}



