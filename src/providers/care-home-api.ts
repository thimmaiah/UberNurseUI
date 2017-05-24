import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Angular2TokenService } from 'angular2-token';


@Injectable()
export class CareHomeApi {

  private base_url = "care_homes";
  care_homes = [];
  care_home = {};

  constructor(public http: Http, private tokenService: Angular2TokenService) {
    console.log('CareHomeApi Provider Created');
  }

  getCareHomes(searchTerm, page) {
    let endpoint = `${this.base_url}.json?search=${searchTerm}&page=${page}`;
    return this.tokenService.get(endpoint).map(response=>{
      this.care_homes = response.json();
      return this.care_homes;
    })
  }

  getCareHomeDetails(care_home_id) {
    return this.tokenService.get(`${this.base_url}/${care_home_id}.json`).map(response=>{
      this.care_home = response.json();
      return this.care_home;
    })
  }

  createCareHome(care_home) {
    return this.tokenService.post(`${this.base_url}.json`, care_home).map(response=>{
      this.care_home = response.json();
      return this.care_home;
      //return response.status;
    })
  }

  updateCareHome(care_home) {
    console.log(`CareHomeApi: Updating care_home`)
    console.log(care_home);
    return this.tokenService.put(`${this.base_url}/${care_home.id}.json`, care_home).map(response=>{
      this.care_home = response.json();
      return this.care_home;
    })
  }

  deleteCareHome(care_home) {
    return this.tokenService.delete(`${this.base_url}/${care_home.id}.json`).map(response=>{
      return response.status;
    })
  }

}
