import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Angular2TokenService } from 'angular2-token';


/*
  Generated class for the UserApi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserApi {

  private base_url = "users";
  private remoteEndpoint;
  users = [];
  user = {};

  constructor(public http: Http, private tokenService: Angular2TokenService) {
    console.log('UserApi Provider Created');
  }

  getUsers() {
    
    return this.tokenService.get(`${this.base_url}.json`).map(response=>{
      this.users = response.json();
      return this.users;      
    })
  }

  getUserDetails(user_id) {
    return this.http.get(`${this.base_url}/${user_id}.json`).map(response=>{
      this.user = response.json();
      return this.user;
    })
  }

  createUser(user) {
    return this.http.post(`${this.base_url}.json`, user).map(response=>{
      this.user = response.json();
      return this.user;
      //return response.status;
    })
  }

  updateUser(user) {
    console.log(`UserApi: Updating user`)
    console.log(user);
    return this.http.put(`${this.base_url}/${user.id}.json`, user).map(response=>{
      this.user = response.json();
      return this.user;
    })
  }

  deleteUser(user) {
    return this.http.delete(`${this.base_url}/${user.id}.json`).map(response=>{
      return response.status;
    })
  }

}
