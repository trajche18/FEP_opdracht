import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { SharedModule } from '../../shared/shared.module';
import {LeningFormComponent} from "../lening-form/lening-form.component";
import {LeningService} from "./lening.service";
import {LeningListComponent} from "../lening-list/lening-list.component";
import {RouterModule} from "@angular/router";
import {LeningDetailComponent} from "../lening-detail/lening-detail.component";


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        AngularFireDatabaseModule,
        RouterModule,
    ],
    declarations: [
        LeningFormComponent,
        LeningListComponent,
        LeningDetailComponent,
    ],
    providers: [
        LeningService
    ]
})
export class LeningModule { }
