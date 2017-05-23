import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class StaffingRequestApi {

  private base_url = "staffing_requests";
  staffingRequests = [];
  staffingRequest = {};

  constructor(public http: Http, private tokenService: Angular2TokenService) {
    console.log('StaffingRequestApi Provider Created');
  }

  getStaffingRequests() {
    return this.tokenService.get(`${this.base_url}.json`).map(response=>{
      this.staffingRequests = response.json();
      return this.staffingRequests;
    })
  }

  price(staffingRequest) {
    return this.tokenService.post(`${this.base_url}/price.json`, staffingRequest).map(response=>{
      this.staffingRequest = response.json();
      return this.staffingRequest;
      //return response.status;
    })
  }

  getStaffingRequestDetails(staffingRequest_id) {
    return this.tokenService.get(`${this.base_url}/${staffingRequest_id}.json`).map(response=>{
      this.staffingRequest = response.json();
      return this.staffingRequest;
    })
  }

  createStaffingRequest(staffingRequest) {
    return this.tokenService.post(`${this.base_url}.json`, staffingRequest).map(response=>{
      this.staffingRequest = response.json();
      return this.staffingRequest;
      //return response.status;
    })
  }

  updateStaffingRequest(staffingRequest) {
    console.log(`StaffingRequestApi: Updating staffingRequest`)
    console.log(staffingRequest);
    return this.tokenService.put(`${this.base_url}/${staffingRequest.id}.json`, staffingRequest).map(response=>{
      this.staffingRequest = response.json();
      return this.staffingRequest;
    })
  }

  deleteStaffingRequest(staffingRequest) {
    return this.tokenService.delete(`${this.base_url}/${staffingRequest.id}.json`).map(response=>{
      return response.status;
    })
  }

}
