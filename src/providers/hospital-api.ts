import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class HospitalApi {

  private base_url = "http://localhost:3000/hospitals";
  hospitals = [];
  hospital = {};

  constructor(public http: Http) {
    console.log('HospitalApi Provider Created');
  }

  getHospitals() {
    return this.http.get(`${this.base_url}.json`).map(response=>{
      this.hospitals = response.json();
      return this.hospitals;
    })
  }

  getHospitalDetails(hospital_id) {
    return this.http.get(`${this.base_url}/${hospital_id}.json`).map(response=>{
      this.hospital = response.json();
      return this.hospital;
    })
  }

  createHospital(hospital) {
    return this.http.post(`${this.base_url}.json`, hospital).map(response=>{
      this.hospital = response.json();
      return this.hospital;
      //return response.status;
    })
  }

  updateHospital(hospital) {
    console.log(`HospitalApi: Updating hospital`)
    console.log(hospital);
    return this.http.put(`${this.base_url}/${hospital.id}.json`, hospital).map(response=>{
      this.hospital = response.json();
      return this.hospital;
    })
  }

  deleteHospital(hospital) {
    return this.http.delete(`${this.base_url}/${hospital.id}.json`).map(response=>{
      return response.status;
    })
  }

}
