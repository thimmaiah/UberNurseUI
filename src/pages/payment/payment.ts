import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PaymentApi } from '../../providers/payment-api';
import { ResponseUtility } from '../../providers/response-utility';
import { PaymentDetails } from '../payment/payment-details'



@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class Payment {

  payments: any;
  payment: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController: LoadingController, 
    public paymentApi: PaymentApi, public respUtility: ResponseUtility) {
  }

  

  ionViewWillEnter() {
    console.log('ionViewWillEnter Paymentss');

    let loader = this.loadingController.create({
      content: 'Loading Payments...'
    });

    loader.present();


    this.paymentApi.getPayments().subscribe(
      payments => {
        this.payments = payments;
        console.log("Loaded payments");
      },
      error => { this.respUtility.showFailure(error); loader.dismiss();},
      () => { loader.dismiss(); }
    );

  }

  getPaymentDetails(payment) {
    let loader = this.loadingController.create({
      content: 'Loading Payments...'
    });

    loader.present()
    this.paymentApi.getPaymentDetails(payment.id).subscribe(
      payment => {
        this.payment = payment;
        console.log("got payment " + payment);
        this.navCtrl.push(PaymentDetails, payment);
      },
      error => { this.respUtility.showFailure(error); loader.dismiss();},
      () => { loader.dismiss(); }
    );

  }
}
