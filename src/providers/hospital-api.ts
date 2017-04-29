import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Angular2TokenService } from 'angular2-token';


@Injectable()
export class HospitalApi {

  private base_url = "hospitals";
  hospitals = [];
  hospital = {};

  constructor(public http: Http, private tokenService: Angular2TokenService) {
    console.log('HospitalApi Provider Created');
  }

  getHospitals() {
    return this.tokenService.get(`${this.base_url}.json`).map(response=>{
      this.hospitals = response.json();
      return this.hospitals;
    })
  }

  getHospitalDetails(hospital_id) {
    return this.tokenService.get(`${this.base_url}/${hospital_id}.json`).map(response=>{
      this.hospital = response.json();
      return this.hospital;
    })
  }

  createHospital(hospital) {
    return this.tokenService.post(`${this.base_url}.json`, hospital).map(response=>{
      this.hospital = response.json();
      return this.hospital;
      //return response.status;
    })
  }

  updateHospital(hospital) {
    console.log(`HospitalApi: Updating hospital`)
    console.log(hospital);
    return this.tokenService.put(`${this.base_url}/${hospital.id}.json`, hospital).map(response=>{
      this.hospital = response.json();
      return this.hospital;
    })
  }

  deleteHospital(hospital) {
    return this.tokenService.delete(`${this.base_url}/${hospital.id}.json`).map(response=>{
      return response.status;
    })
  }

}
