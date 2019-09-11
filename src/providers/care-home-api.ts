import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AngularTokenService } from 'angular-token';
import { Config } from './config';


@Injectable()
export class CareHomeApi {

  private base_url = "care_homes";
  care_homes: any;
  care_home = {};

  constructor(public http: HttpClient, private config: Config) {
    console.log('CareHomeApi Provider Created');
    this.base_url = this.config.props["API_URL"] + "/care_homes"
  }

  getCareHomes(searchTerm, page) {
    let endpoint = `${this.base_url}.json?search=${searchTerm}&page=${page}`;
    return this.http.get(endpoint).map(response=>{
      this.care_homes = response;
      return this.care_homes;
    })
  }

  getCareHomeDetails(care_home_id) {
    return this.http.get(`${this.base_url}/${care_home_id}.json`).map(response=>{
      this.care_home = response;
      return this.care_home;
    })
  }

  generateQRCode() {
    return this.http.get(`${this.base_url}/new_qr_code.json`).map(response=>{
      this.care_home = response;
      return this.care_home;
    })
  }

  createCareHome(care_home) {
    return this.http.post(`${this.base_url}.json`, care_home).map(response=>{
      this.care_home = response;
      return this.care_home;
      //return response.status;
    })
  }

  claim(care_home, user_id) {
    return this.http.post(`${this.base_url}/claim.json`, {care_home_id: care_home.id, user_id: user_id}).map(response=>{
      return response;
    })
  }

  updateCareHome(care_home) {
    console.log(`CareHomeApi: Updating care_home`)
    console.log(care_home);
    return this.http.put(`${this.base_url}/${care_home.id}.json`, care_home).map(response=>{
      this.care_home = response;
      return this.care_home;
    })
  }

  deleteCareHome(care_home) {
    return this.http.delete(`${this.base_url}/${care_home.id}.json`).map(response=>{
      return response;
    })
  }

}
