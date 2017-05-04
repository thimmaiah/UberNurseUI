import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { HospitalForm } from '../hospitals/hospital-form';
import { HospitalApi } from '../../providers/hospital-api';
import { ResponseUtility } from '../../providers/response-utility';
/**
 * Generated class for the HospitalsDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-hospital-details',
  templateUrl: 'hospital-details.html',
})
export class HospitalDetails {

  hospital: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public hospitalApi: HospitalApi,
    public alertController: AlertController,
    public toastController: ToastController,
    public respUtility: ResponseUtility) {
    this.hospital = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HospitalsDetails');
  }

  editHospital(hospital) {
    this.navCtrl.push(HospitalForm, hospital);
  }

  deleteHospital(hospital) {
    this.hospitalApi.deleteHospital(hospital).subscribe(
      response => {
        this.respUtility.showSuccess("Deleted Hospitals");
        this.navCtrl.pop();
      },
      error => {
        this.respUtility.showFailure(error);
      }
    );
  }

  confirmDelete(hospital) {
    this.respUtility.confirmDelete(this.deleteHospital.bind(this), hospital);      
  }
}
