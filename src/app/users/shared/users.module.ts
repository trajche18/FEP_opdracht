import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import {AuthService} from "../../core/auth.service";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ResetPasswordComponent} from "../reset-password/reset-password.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {UserProfileComponent} from "../../ui/user-profile/user-profile.component";
import {ProfileComponent} from "../profile/profile.component";
import {LeningVerlengenComponent} from "../../lening/lening-verlengen/lening-verlengen.component";
import {UsersService} from "./users.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  declarations: [
      LoginComponent,
      RegisterComponent,
      ResetPasswordComponent,
      DashboardComponent,
      UserProfileComponent,
      ProfileComponent,
  ],
  exports: [
      UserProfileComponent
  ],
  providers: [AuthService, UsersService],

})
export class UsersModule { }
