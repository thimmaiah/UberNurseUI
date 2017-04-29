import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class StaffingResponseApi {

  private base_url = "staffing_responses";
  staffingResponses = [];
  staffingResponse = {};
  

  constructor(public http: Http, private tokenService: Angular2TokenService) {
    console.log('StaffingResponseApi Provider Created');
  }

  getStaffingResponses() {
    return this.tokenService.get(`${this.base_url}.json`).map(response=>{
      this.staffingResponses = response.json();
      return this.staffingResponses;
    })
  }

  getStaffingResponseDetails(staffingResponse_id) {
    return this.tokenService.get(`${this.base_url}/${staffingResponse_id}.json`).map(response=>{
      this.staffingResponse = response.json();
      return this.staffingResponse;
    })
  }

  createStaffingResponse(staffingResponse) {
    return this.tokenService.post(`${this.base_url}.json`, staffingResponse).map(response=>{
      this.staffingResponse = response.json();
      return this.staffingResponse;
      //return response.status;
    })
  }

  updateStaffingResponse(staffingResponse) {
    console.log(`StaffingResponseApi: Updating staffingResponse`)
    console.log(staffingResponse);
    return this.tokenService.put(`${this.base_url}/${staffingResponse.id}.json`, staffingResponse).map(response=>{
      this.staffingResponse = response.json();
      return this.staffingResponse;
    })
  }

  deleteStaffingResponse(staffingResponse) {
    return this.tokenService.delete(`${this.base_url}/${staffingResponse.id}.json`).map(response=>{
      return response.status;
    })
  }

}
