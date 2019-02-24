import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AngularTokenService } from 'angular-token';
import { Config } from './config';


@Injectable()
export class AgencyApi {

  private base_url = "agencies";
  agencies: any;
  agency = {};

  constructor(public http: HttpClient, private config: Config) {
    console.log('AgencyApi Provider Created');
    this.base_url = this.config.props["API_URL"] + "/agencies"
  }

  getAgencies(searchTerm, page) {
    let endpoint = `${this.base_url}.json?search=${searchTerm}&page=${page}`;
    return this.http.get(endpoint).map(response=>{
      this.agencies = response;
      return this.agencies;
    })
  }

  getAgencyDetails(agency_id) {
    return this.http.get(`${this.base_url}/${agency_id}.json`).map(response=>{
      this.agency = response;
      return this.agency;
    })
  }

  createAgency(agency) {
    return this.http.post(`${this.base_url}.json`, agency).map(response=>{
      this.agency = response;
      return this.agency;
      //return response.status;
    })
  }

  updateAgency(agency) {
    console.log(`AgencyApi: Updating agency`)
    console.log(agency);
    return this.http.put(`${this.base_url}/${agency.id}.json`, agency).map(response=>{
      this.agency = response;
      return this.agency;
    })
  }

}
