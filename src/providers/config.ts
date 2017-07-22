import { Injectable } from '@angular/core';


@Injectable()
export class Config {

  private dev = {
    API_URL: "http://192.168.0.8:3000",
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
