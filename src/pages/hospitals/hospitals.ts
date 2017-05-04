import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HospitalApi } from '../../providers/hospital-api';
import { ResponseUtility } from '../../providers/response-utility';
import { HospitalDetails } from '../hospitals/hospital-details'

/**
 * Generated class for the Hospitals page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-Hospital',
  templateUrl: 'hospitals.html',
})
export class Hospitals {

  hospitals: any;
  hospital: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingController: LoadingController, 
    public hospitalApi: HospitalApi, 
    public respUtility: ResponseUtility) {
  }

  

  ionViewWillEnter() {
    console.log('ionViewWillEnter Hospitals');

    let loader = this.loadingController.create({
      content: 'Loading Hospitals...'
    });
    loader.present();

    this.hospitalApi.getHospitals().subscribe(
      Hospital => {
        this.hospitals = Hospital;
        console.log("Loaded Hospital");
        console.log(this.hospitals);
      },
      error => { this.respUtility.showFailure(error); loader.dismiss(); },
      () => { loader.dismiss(); }
    );

  }

  getHospitalDetails(hospital) {
    let loader = this.loadingController.create({
      content: 'Loading Hospitals...'
    });

    loader.present()
    this.hospitalApi.getHospitalDetails(hospital.id).subscribe(
      hospital => {
        this.hospital = hospital;
        console.log("got hospital " + hospital);
        this.navCtrl.push(HospitalDetails, hospital);
      },
      error => { this.respUtility.showFailure(error); },
      () => { loader.dismiss(); }
    );

  }
}
