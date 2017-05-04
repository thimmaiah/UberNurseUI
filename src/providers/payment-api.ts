import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Angular2TokenService } from 'angular2-token';

/*
  Generated class for the PaymentApi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PaymentApi {

  private base_url = "payments";
  payments = [];
  payment = {};

  constructor(public http: Http, private tokenService: Angular2TokenService) {
    console.log('PaymentApi Provider Created');
  }

  getPayments() {
    return this.tokenService.get(`${this.base_url}.json`).map(response=>{
      this.payments = response.json();
      return this.payments;
    })
  }

  getPaymentDetails(payment_id) {
    return this.tokenService.get(`${this.base_url}/${payment_id}.json`).map(response=>{
      this.payment = response.json();
      return this.payment;
    })
  }

  createPayment(payment) {
    return this.tokenService.post(`${this.base_url}.json`, payment).map(response=>{
      this.payment = response.json();
      return this.payment;
      //return response.status;
    })
  }

  updatePayment(payment) {
    console.log(`PaymentApi: Updating payment`)
    console.log(payment);
    return this.tokenService.put(`${this.base_url}/${payment.id}.json`, payment).map(response=>{
      this.payment = response.json();
      return this.payment;
    })
  }

  deletePayment(payment) {
    return this.tokenService.delete(`${this.base_url}/${payment.id}.json`).map(response=>{
      return response.status;
    })
  }

}
