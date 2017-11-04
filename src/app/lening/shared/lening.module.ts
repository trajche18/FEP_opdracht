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
import {LeningDetailComponent} from "../lening-detail/lening-detail.component";
import {UsersService} from "../../users/shared/users.service";
import {UsersModule} from "../../users/shared/users.module";
import {MailModule} from "../../mail/mail.module";
import {LeningListUserComponent} from "../lening-list-user/lening-list-user.component";
import {LeningDetailUserComponent} from "../lening-detail-user/lening-detail-user.component";


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        AngularFireDatabaseModule,
        RouterModule,
        NgbModule,
        HardwareModule,
        UsersModule,
        MailModule,
    ],
    declarations: [
        LeningFormComponent,
        LeningListComponent,
        LeningDetailComponent,
        LeningVerlengenComponent,
        LeningListUserComponent,
        LeningDetailUserComponent,
        LeningVerlengenComponent
    ],
    providers: [
        LeningService,
        HardwareService,
        UsersService
    ]
})
export class LeningModule { }
