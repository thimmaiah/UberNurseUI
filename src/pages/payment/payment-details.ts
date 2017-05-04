import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PaymentForm } from '../payment/payment-form';
import { PaymentApi } from '../../providers/payment-api';
import { ResponseUtility } from '../../providers/response-utility';


@Component({
  selector: 'page-payment-details',
  templateUrl: 'payment-details.html',
})
export class PaymentDetails {

  payment: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public paymentApi: PaymentApi,
    public loadingController: LoadingController, 
    public respUtility: ResponseUtility) {
    this.payment = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentsDetails');
  }

  editPayment(payment) {
    this.navCtrl.push(PaymentForm, payment);
  }

  deletePayment(payment) {

    let loader = this.loadingController.create({
      content: 'Deleting ...'
    });

    loader.present();

    this.paymentApi.deletePayment(payment).subscribe(
      response => {
        this.respUtility.showSuccess("Deleted Payments");
        this.navCtrl.pop();
      },
      error => { this.respUtility.showFailure(error); loader.dismiss();},
      () => { loader.dismiss(); }
    );
  }

  confirmDelete(payment) {
    this.respUtility.confirmDelete(this.deletePayment.bind(this), payment);      
  }
}
