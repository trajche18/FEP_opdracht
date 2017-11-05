import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';

@Injectable()
export class SettingsService {
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


    Cookies.set(name, value);
  }

  get(name : string) : string {
    return Cookies.get(name);
  }

  getBoolean(name : string) : boolean {
    return Cookies.get(name) === 'true';
  }

  setBoolean(name : string, value : boolean) : void {
    Cookies.set(name, value.toString());
  }

  isSet(name : string) {
    return Cookies.get(name);
  }
}
