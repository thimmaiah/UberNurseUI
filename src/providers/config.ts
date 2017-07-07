import { Injectable } from '@angular/core';

/*
  Generated class for the PaymentApi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Config {

  private dev = {
    API_URL: "http://192.168.1.103:3000",
    //API_URL: "http://localhost:3000",
    ENV: "dev"
  };

  private test = {
    API_URL: "http://localhost:3000",
    ENV: "test"
  };

  private prod = {
    API_URL: "http://dev.connuct.co.uk",
    ENV: "prod"
  };
  
  public props = this.test;

  constructor() {
    
  }
  
}
