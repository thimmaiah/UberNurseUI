import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the UserApi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserApi {

  private base_url = "http://localhost:3000/users";
  users = [];
  constructor(public http: Http) {
    console.log('Hello UserApi Provider');
  }

  getUsers() {
    return this.http.get(`${this.base_url}.json`).map(response=>{
      this.users = response.json();
      return this.users;
    })
  }
}
