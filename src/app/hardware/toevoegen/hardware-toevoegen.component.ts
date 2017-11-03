import { Component, OnInit } from '@angular/core';
import {Hardware} from "../shared/hardware";
import {HardwareService} from "../shared/hardware.service";

@Component({
  selector: 'hardware-toevoegen',
  templateUrl: './hardware-toevoegen.component.html',
  styleUrls: ['./hardware-toevoegen.component.scss']
})
export class HardwareToevoegenComponent implements OnInit {
  hardware: Hardware = new Hardware();
  constructor(private hardwareServ: HardwareService) { }

  ngOnInit() {
  }
  createHardware() {
    this.hardware.status = 'beschikbaar';
    this.hardwareServ.createHardware(this.hardware);
/*
    this.hardware = new Hardware();
*/
    console.log("test");
  }
}
