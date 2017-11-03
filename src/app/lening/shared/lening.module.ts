import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { SharedModule } from '../../shared/shared.module';
import {LeningFormComponent} from "../lening-form/lening-form.component";
import {LeningService} from "./lening.service";
import {LeningListComponent} from "../lening-list/lening-list.component";
import {RouterModule} from "@angular/router";
import {LeningVerlengenComponent} from "../lening-verlengen/lening-verlengen.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HardwareModule} from "../../hardware/shared/hardware.module";
import {HardwareService} from "../../hardware/shared/hardware.service";


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        AngularFireDatabaseModule,
        RouterModule,
        NgbModule,
      HardwareModule
    ],
    declarations: [
        LeningFormComponent,
        LeningListComponent,
        LeningVerlengenComponent
    ],
    providers: [
        LeningService,
        HardwareService
    ]
})
export class LeningModule { }
