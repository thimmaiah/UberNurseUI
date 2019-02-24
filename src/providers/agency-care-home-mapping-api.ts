import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AngularTokenService } from 'angular-token';
import { Config } from './config';


@Injectable()
export class AgencyCareHomeMappingApi {

  private base_url = "agency_care_home_mappings";
  agency_care_home_mappings: any;
  agency_care_home_mapping = {};

  constructor(public http: HttpClient, private config: Config) {
    console.log('AgencyCareHomeMappingApi Provider Created');
    this.base_url = this.config.props["API_URL"] + "/agency_care_home_mappings"
  }

  getAgencyCareHomeMappings(searchTerm, page) {
    let endpoint = `${this.base_url}.json?search=${searchTerm}&page=${page}`;
    return this.http.get(endpoint).map(response=>{
      this.agency_care_home_mappings = response;
      return this.agency_care_home_mappings;
    })
  }

  getAgencyCareHomeMappingDetails(agency_care_home_mapping_id) {
    return this.http.get(`${this.base_url}/${agency_care_home_mapping_id}.json`).map(response=>{
      this.agency_care_home_mapping = response;
      return this.agency_care_home_mapping;
    })
  }

  generateQRCode() {
    return this.http.get(`${this.base_url}/new_qr_code.json`).map(response=>{
      this.agency_care_home_mapping = response;
      return this.agency_care_home_mapping;
    })
  }

  createAgencyCareHomeMapping(agency_care_home_mapping) {
    return this.http.post(`${this.base_url}.json`, agency_care_home_mapping).map(response=>{
      this.agency_care_home_mapping = response;
      return this.agency_care_home_mapping;
      //return response.status;
    })
  }

  updateAgencyCareHomeMapping(agency_care_home_mapping) {
    console.log(`AgencyCareHomeMappingApi: Updating agency_care_home_mapping`)
    console.log(agency_care_home_mapping);
    return this.http.put(`${this.base_url}/${agency_care_home_mapping.id}.json`, agency_care_home_mapping).map(response=>{
      this.agency_care_home_mapping = response;
      return this.agency_care_home_mapping;
    })
  }

  deleteAgencyCareHomeMapping(agency_care_home_mapping) {
    return this.http.delete(`${this.base_url}/${agency_care_home_mapping.id}.json`).map(response=>{
      return response;
    })
  }

}
