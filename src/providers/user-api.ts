import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AngularTokenService } from 'angular-token';
import { Config } from './config';


@Injectable()
export class UserApi {

  private base_url = "users";
  private remoteEndpoint;
  users:any;
  user = {};

  constructor(public http: HttpClient, private config: Config) {
    console.log('UserApi Provider Created');
    this.base_url = this.config.props["API_URL"] + "/users";
  }

  getUsers() {
    
    return this.http.get(`${this.base_url}.json`).map(response=>{
      this.users = response;
      return this.users;      
    })
  }

  getUserDetails(user_id) {
    return this.http.get(`${this.base_url}/${user_id}.json`).map(response=>{
      this.user = response;
      return this.user;
    })
  }

  sendVerificationCode() {
    return this.http.post(`${this.base_url}/send_sms_verification.json`, {}).map(response=>{
      let resp = response;
      return resp;
    })
  }

  confirmVerificationCode(code) {
    return this.http.post(`${this.base_url}/verify_sms_verification.json`, {"code": code}).map(response=>{
      let resp = response;
      return resp;
    })
  }

  createUser(user) {
    return this.http.post(`${this.base_url}.json`, user).map(response=>{
      this.user = response;
      return this.user;
      //return response.status;
    })
  }

  updateUser(user) {
    console.log(`UserApi: Updating user`)
    console.log(user);
    return this.http.put(`${this.base_url}/${user.id}.json`, user).map(response=>{
      this.user = response;
      return this.user;
    })
  }

  deleteUser(user) {
    return this.http.delete(`${this.base_url}/${user.id}.json`).map(response=>{
      return response;
    })
  }

  resendConfirmationEmail(email) {
    return this.http.post(`${this.base_url}/resend_confirmation.json`, {"email":email}).map(response=>{
      this.user = response;
      return this.user;
      //return response.status;
    })
  }
}
