import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the StaffingRequestApi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StaffingRequestApi {

  private base_url = "http://localhost:3000/staffing_requests";
  staffingRequests = [];
  staffingRequest = {};

  constructor(public http: Http) {
    console.log('StaffingRequestApi Provider Created');
  }

  getStaffingRequests() {
    return this.http.get(`${this.base_url}.json`).map(response=>{
      this.staffingRequests = response.json();
      return this.staffingRequests;
    })
  }

  getStaffingRequestDetails(staffingRequest_id) {
    return this.http.get(`${this.base_url}/${staffingRequest_id}.json`).map(response=>{
      this.staffingRequest = response.json();
      return this.staffingRequest;
    })
  }

  createStaffingRequest(staffingRequest) {
    return this.http.post(`${this.base_url}.json`, staffingRequest).map(response=>{
      this.staffingRequest = response.json();
      return this.staffingRequest;
      //return response.status;
    })
  }

  updateStaffingRequest(staffingRequest) {
    console.log(`StaffingRequestApi: Updating staffingRequest`)
    console.log(staffingRequest);
    return this.http.put(`${this.base_url}/${staffingRequest.id}.json`, staffingRequest).map(response=>{
      this.staffingRequest = response.json();
      return this.staffingRequest;
    })
  }

  deleteStaffingRequest(staffingRequest) {
    return this.http.delete(`${this.base_url}/${staffingRequest.id}.json`).map(response=>{
      return response.status;
    })
  }

}
