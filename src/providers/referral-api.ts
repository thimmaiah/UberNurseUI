import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Angular2TokenService } from 'angular2-token';


@Injectable()
export class ReferralApi {

  private base_url = "referrals";
  referrals = [];
  referral = {};

  constructor(public http: Http, private tokenService: Angular2TokenService) {
    console.log('ReferralApi Provider Created');
  }

  getReferrals() {
    let endpoint = `${this.base_url}.json?`;
    return this.tokenService.get(endpoint).map(response=>{
      this.referrals = response.json();
      return this.referrals;
    })
  }

  getReferralDetails(referral_id) {
    return this.tokenService.get(`${this.base_url}/${referral_id}.json`).map(response=>{
      this.referral = response.json();
      return this.referral;
    })
  }

  createReferral(referral) {
    return this.tokenService.post(`${this.base_url}.json`, referral).map(response=>{
      this.referral = response.json();
      return this.referral;
      //return response.status;
    })
  }

  updateReferral(referral) {
    console.log(`ReferralApi: Updating referral`)
    console.log(referral);
    return this.tokenService.put(`${this.base_url}/${referral.id}.json`, referral).map(response=>{
      this.referral = response.json();
      return this.referral;
    })
  }

  deleteReferral(referral) {
    return this.tokenService.delete(`${this.base_url}/${referral.id}.json`).map(response=>{
      return response.status;
    })
  }

}
