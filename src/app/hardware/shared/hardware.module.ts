import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SharedModule } from '../../shared/shared.module';
import {HardwareService} from "./hardware.service";
import {HardwareToevoegenComponent} from "../toevoegen/hardware-toevoegen.component";
import {HardwareListComponent} from "../hardware-list/hardware-list.component";
import {HardwareDetailComponent} from "../hardware-detail/hardware-detail.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HardwareDetailUserComponent} from "../hardware-detail-user/hardware-detail-user.component";
import {HardwareListUserComponent} from "../hardware-list-user/hardware-list-user.component";
import {LeningService} from "../../lening/shared/lening.service";
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule,
    NgbModule,
    RouterModule,
  ],
  declarations: [
    HardwareToevoegenComponent,
    HardwareListComponent,
    HardwareDetailComponent,
    HardwareListUserComponent,
    HardwareDetailUserComponent
  ],
  providers: [
    HardwareService,
    LeningService
  ],
  exports: [
    HardwareDetailComponent,
  ]

})
export class HardwareModule { }
