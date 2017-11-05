import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MailProviderMailgunService} from "./mail-provider-mailgun.service";
import {MailProviderSendgridService} from "./mail-provider-sendgrid.service";
import {MailSenderService} from "./mail-sender.service";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {SettingsService} from "../settings.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    HttpModule,
    HttpClientModule,
    SettingsService,
    MailSenderService,
    MailProviderSendgridService,
    MailProviderMailgunService,
  ]
})
export class MailModule { }
