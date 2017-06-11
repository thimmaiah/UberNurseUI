import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class ShiftApi {

  private base_url = "shifts";
  shifts = [];
  shift = {};
  

  constructor(public http: Http, private tokenService: Angular2TokenService) {
    console.log('ShiftApi Provider Created');
  }

  getShifts(staffing_request_id, response_status=null) {
    let url = `${this.base_url}.json?response_status=${response_status}`;
    if(staffing_request_id) {
      url = `${this.base_url}.json?response_status=${response_status}&staffing_request_id=${staffing_request_id}`;
    }
    return this.tokenService.get(url).map(response=>{
      this.shifts = response.json();
      return this.shifts;
    })
  }

  

  getShiftDetails(shift_id) {
    return this.tokenService.get(`${this.base_url}/${shift_id}.json`).map(response=>{
      this.shift = response.json();
      return this.shift;
    })
  }

  createShift(shift) {
    return this.tokenService.post(`${this.base_url}.json`, shift).map(response=>{
      this.shift = response.json();
      return this.shift;
      //return response.status;
    })
  }

  updateShift(shift) {
    console.log(`ShiftApi: Updating shift`)
    console.log(shift);
    return this.tokenService.put(`${this.base_url}/${shift.id}.json`, shift).map(response=>{
      this.shift = response.json();
      return this.shift;
    })
  }

  deleteShift(shift) {
    return this.tokenService.delete(`${this.base_url}/${shift.id}.json`).map(response=>{
      return response.status;
    })
  }

}
