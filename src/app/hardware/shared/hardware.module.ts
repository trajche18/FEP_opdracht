import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SharedModule } from '../../shared/shared.module';
import {HardwareService} from "./hardware.service";
import {HardwareToevoegenComponent} from "../toevoegen/hardware-toevoegen.component";



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    HardwareToevoegenComponent,
  ],
  providers: [
  HardwareService
  ]
})
export class HardwareModule { }
