import { Injectable } from '@angular/core';

/*
  Generated class for the PaymentApi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Config {

  public API_URL = "http://192.168.0.4:3000";

  constructor() {
    
  }
  
}
