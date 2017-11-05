import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class SettingsService {

  constructor( private cookieService: CookieService ) { }

  set(name : string, value) : void {
    if (!value && typeof(value) !== 'number') {
      value = '';
    }

    console.log(name);
    console.log(value);
    if(value === undefined) {
      value = '';
    }
    if(name === undefined) {
      name = '';
    }

    this.cookieService.set(name, value);
  }

  get(name : string) : string {
    return this.cookieService.get(name);
  }

  getBoolean(name : string) : boolean {
    return this.cookieService.get(name) === 'true';
  }

  setBoolean(name : string, value : boolean) : void {
    this.cookieService.set(name, value.toString());
  }

  isSet(name : string) {
    return this.cookieService.get(name);
  }
}
