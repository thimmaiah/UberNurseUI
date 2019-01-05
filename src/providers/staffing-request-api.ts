import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AngularTokenService } from 'angular-token';
import { Config } from './config';

@Injectable()
export class StaffingRequestApi {

  private base_url = "staffing_requests";
  staffingRequests: any;
  staffingRequest = {};

  constructor(public http: HttpClient, private config: Config) {
    console.log('StaffingRequestApi Provider Created');
    this.base_url = this.config.props["API_URL"] + "/staffing_requests";
  }

  getStaffingRequests() {
    return this.http.get(`${this.base_url}.json`).map(response=>{
      this.staffingRequests = response;
      return this.staffingRequests;
    })
  }

  price(staffingRequest) {
    return this.http.post(`${this.base_url}/price.json`, staffingRequest).map(response=>{
      this.staffingRequest = response;
      return this.staffingRequest;
      //return response.status;
    })
  }

  getStaffingRequestDetails(staffingRequest_id) {
    return this.http.get(`${this.base_url}/${staffingRequest_id}.json`).map(response=>{
      this.staffingRequest = response;
      return this.staffingRequest;
    })
  }

  createStaffingRequest(staffingRequest) {
    return this.http.post(`${this.base_url}.json`, staffingRequest).map(response=>{
      this.staffingRequest = response;
      return this.staffingRequest;
      //return response.status;
    })
  }

  updateStaffingRequest(staffingRequest) {
    console.log(`StaffingRequestApi: Updating staffingRequest`)
    console.log(staffingRequest);
    return this.http.put(`${this.base_url}/${staffingRequest.id}.json`, staffingRequest).map(response=>{
      this.staffingRequest = response;
      return this.staffingRequest;
    })
  }

  deleteStaffingRequest(staffingRequest) {
    return this.http.delete(`${this.base_url}/${staffingRequest.id}.json`).map(response=>{
      return response;
    })
  }

}
