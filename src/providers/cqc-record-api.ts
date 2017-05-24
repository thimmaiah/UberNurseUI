import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Angular2TokenService } from 'angular2-token';


@Injectable()
export class CqcRecordApi {

  private base_url = "cqc_records";
  cqc_records = [];
  cqc_record = {};

  constructor(public http: Http, private tokenService: Angular2TokenService) {
    console.log('CqcRecordApi Provider Created');
  }

  getCqcRecords(searchTerm) {
    let endpoint = `${this.base_url}.json?search=${searchTerm}`;
    return this.tokenService.get(endpoint).map(response=>{
      this.cqc_records = response.json();
      return this.cqc_records;
    })
  }

  getCqcRecordDetails(cqc_record_id) {
    return this.tokenService.get(`${this.base_url}/${cqc_record_id}.json`).map(response=>{
      this.cqc_record = response.json();
      return this.cqc_record;
    })
  }

  createCqcRecord(cqc_record) {
    return this.tokenService.post(`${this.base_url}.json`, cqc_record).map(response=>{
      this.cqc_record = response.json();
      return this.cqc_record;
      //return response.status;
    })
  }

  updateCqcRecord(cqc_record) {
    console.log(`CqcRecordApi: Updating cqc_record`)
    console.log(cqc_record);
    return this.tokenService.put(`${this.base_url}/${cqc_record.id}.json`, cqc_record).map(response=>{
      this.cqc_record = response.json();
      return this.cqc_record;
    })
  }

  deleteCqcRecord(cqc_record) {
    return this.tokenService.delete(`${this.base_url}/${cqc_record.id}.json`).map(response=>{
      return response.status;
    })
  }

}
