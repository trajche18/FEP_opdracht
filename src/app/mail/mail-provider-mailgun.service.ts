  import { Injectable } from '@angular/core';
import { IMailProvider } from './IMailProvider';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import { SettingsService } from '../settings.service';
import 'rxjs/add/operator/toPromise';

const DOMAIN_NAME_PLACEHOLDER = '{DOMAIN_NAME}';

export const SETTING_ENABLED_KEY = 'true';
export const SETTING_DOMAIN_NAME_KEY = 'sandbox6a0d333799544b709fbcfea8f4580bae.mailgun.org';
export const SETTING_API_KEY_NAME = 'key-6cb307bfe43000f0dbfc1565179003fe';

@Injectable()
export class MailProviderMailgunService implements IMailProvider {
  public get isConfigured() : boolean {
    return Boolean(this.domainName && this.apiKey);
  }

  public get isEnabled() : boolean {
    if (!this.settings.isSet(this._settingEnabledKey)) {
      this.settings.set(this._settingEnabledKey, true);

      return true;
    }

    return this.settings.getBoolean(this._settingEnabledKey);
  }

  public set isEnabled(value : boolean) {
    this.settings.setBoolean(this._settingEnabledKey, value);
  }

  public get domainName() : string {
    return this.settings.get(this._settingDomainNameKey);
  }

  public set domainName(value : string) {
    this.settings.set(this._settingDomainNameKey, value);
  }

  public get apiKey() : string {
    return this.settings.get(this._settingApiKeyName);
  }

  public set apiKey(value : string) {
    this.settings.set(this._settingApiKeyName, value);
  }

  private readonly _apiHostFormat = 'https://api.mailgun.net/v3/sandbox6a0d333799544b709fbcfea8f4580bae.mailgun.org/messages'

  private readonly _statusUrl = 'https://www.mailgun.com/';

  private readonly _settingEnabledKey = SETTING_ENABLED_KEY

  private readonly _settingDomainNameKey = SETTING_DOMAIN_NAME_KEY

  private readonly _settingApiKeyName = SETTING_API_KEY_NAME

  private get _apiHost() : string {
    return this._apiHostFormat.replace(DOMAIN_NAME_PLACEHOLDER, this.domainName);
  }

  private get _headers() : HttpHeaders {
    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Basic ' + btoa(`api:${this.apiKey}`));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return headers;
  }

  constructor(
    private http : HttpClient,
    private settings : SettingsService
  ) { this.domainName = this._settingDomainNameKey;
    this.apiKey = this._settingApiKeyName;
  }

  public async sendMail(from: string, to: string, subject : string, message: string) : Promise<boolean> {
    const body = this._getSendMailRequestBody(from, to, subject, message);

    const result = await this.http.post(this._apiHost, body, {
      headers: this._headers,
      responseType: 'text'
    }).toPromise();

    return true;
  }

  public async checkStatus() : Promise<boolean> {
    if (!this.isEnabled || !this.isConfigured) {
      return Promise.resolve(false);
    }

    try {
      const response = await this.http.get(this._statusUrl, {
        responseType: 'text'
      }).toPromise();

      return true;
    } catch (error) {
      return false;
    }
  }

  private _getSendMailRequestBody(from : string, to : string, subject : string, message : string) {
    const body = new URLSearchParams();

    body.set('from', from);
    body.set('to', to);
    body.set('subject', subject);
    body.set('text', message);

    return body.toString();
  }
}
