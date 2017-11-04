import { Component, OnInit } from '@angular/core';
import {Hardware} from "../shared/hardware";
import {HardwareService} from "../shared/hardware.service";
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'hardware-list',
  templateUrl: './hardware-list.component.html',
  styleUrls: ['./hardware-list.component.scss']
})
export class HardwareListComponent implements OnInit {
  hardwares: any
  showSpinner = true;
  allLeningen : any;

  constructor(private hardwareService: HardwareService, private auth: AuthService) {
    this.hardwares = this.hardwareService.getHardwares()

  }
  ngOnInit() {
   this.hardwares.subscribe(x => {
     this.showSpinner = false
    })
  }
}



