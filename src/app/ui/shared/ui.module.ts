import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NavService } from './nav.service';

import { UserLoginComponent } from '../user-login/user-login.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { TopNavComponent } from '../top-nav/top-nav.component';
import { FooterNavComponent } from '../footer-nav/footer-nav.component';
import { ReadmePageComponent } from '../readme-page/readme-page.component';
import {MailModule} from "../../mail/mail.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MailModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  declarations: [
    TopNavComponent,
    FooterNavComponent,
    ReadmePageComponent
  ],
  exports: [
    TopNavComponent,
    FooterNavComponent,
  ],
  providers: [
    NavService
  ]
})
export class UiModule { }
