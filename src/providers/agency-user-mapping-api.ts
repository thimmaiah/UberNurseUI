import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { LoginProvider } from './providers/login-provider';
import { Config } from './config';


@Injectable()
export class AgencyUserMappingApi {

  private base_url = "agency_user_mappings";
  agency_user_mappings: any;
  agency_user_mapping = {};

  constructor(public http: HttpClient, private config: Config) {
    console.log('AgencyUserMappingApi Provider Created');
    this.base_url = this.config.props["API_URL"] + "/agency_user_mappings"
  }

  getAgencyUserMappings(searchTerm, page) {
    let endpoint = `${this.base_url}.json?search=${searchTerm}&page=${page}`;
    return this.http.get(endpoint).map(response=>{
      this.agency_user_mappings = response;
      return this.agency_user_mappings;
    })
  }

  getAgencyUserMappingDetails(agency_user_mapping_id) {
    return this.http.get(`${this.base_url}/${agency_user_mapping_id}.json`).map(response=>{
      this.agency_user_mapping = response;
      return this.agency_user_mapping;
    })
  }

  generateQRCode() {
    return this.http.get(`${this.base_url}/new_qr_code.json`).map(response=>{
      this.agency_user_mapping = response;
      return this.agency_user_mapping;
    })
  }

  createAgencyUserMapping(agency_user_mapping) {
    return this.http.post(`${this.base_url}.json`, agency_user_mapping).map(response=>{
      this.agency_user_mapping = response;
      return this.agency_user_mapping;
      //return response.status;
    })
  }

  updateAgencyUserMapping(agency_user_mapping) {
    console.log(`AgencyUserMappingApi: Updating agency_user_mapping`)
    console.log(agency_user_mapping);
    return this.http.put(`${this.base_url}/${agency_user_mapping.id}.json`, agency_user_mapping).map(response=>{
      this.agency_user_mapping = response;
      return this.agency_user_mapping;
    })
  }

  deleteAgencyUserMapping(agency_user_mapping) {
    return this.http.delete(`${this.base_url}/${agency_user_mapping.id}.json`).map(response=>{
      return response;
    })
  }

}
