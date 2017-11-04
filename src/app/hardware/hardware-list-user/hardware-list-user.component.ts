import { Component, OnInit } from '@angular/core';
import {Hardware} from "../shared/hardware";
import {HardwareService} from "../shared/hardware.service";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'hardware-list-user',
  templateUrl: './hardware-list-user.component.html',
  styleUrls: ['./hardware-list-user.component.scss']
})
export class HardwareListUserComponent implements OnInit {
  hardwares: any;
  showSpinner = true;

  constructor(private hardwareService: HardwareService) {
    this.hardwares = this.hardwareService.getHardwares()
  }
  ngOnInit() {
    this.hardwares.subscribe(x => {
      this.showSpinner = false
    })
  }

}
