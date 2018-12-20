import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { CareHomeForm } from '../care-homes/care-home-form';
import { CareHomeApi } from '../../providers/care-home-api';
import { ResponseUtility } from '../../providers/response-utility';

import QRCode from 'qrcode';

/**
 * Generated class for the CareHomesDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'care-home-qr-code',
  templateUrl: 'qr_code.html',
})
export class QrCode {

  care_home: any;
  qr_code = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public care_homeApi: CareHomeApi,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController,
    public respUtility: ResponseUtility) {

    this.care_home = this.navParams.data;
    if(this.care_home.qr_code) {
      this.loadQRCode();
    }
    
  }

  displayQrCode() {
    return this.qr_code !== '';
  }

  loadQRCode() {
    const qrcode = QRCode;
    const self = this;
    qrcode.toDataURL(this.care_home.qr_code, { errorCorrectionLevel: 'H' }, function (err, url) {
      self.qr_code = url;
    })
  }

  generateQRCode() {

    let loader = this.loadingController.create({
        content: 'Saving ...'
      });

    loader.present();

      this.care_homeApi.generateQRCode().subscribe(
        care_home => {
          this.care_home = care_home;
          this.loadQRCode();
          this.respUtility.showSuccess('CareHome QR Code updated successfully.');    
        },
        error => {
          this.respUtility.showFailure(error);
          loader.dismiss();
        },
        () => {loader.dismiss();}
      );
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad QrCode');
    this.respUtility.trackView("QrCode");
  }

  
}
