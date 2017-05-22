import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { CareHomeForm } from '../care-homes/care-home-form';
import { CareHomeApi } from '../../providers/care-home-api';
import { ResponseUtility } from '../../providers/response-utility';
/**
 * Generated class for the CareHomesDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-care-home-details',
  templateUrl: 'care-home-details.html',
})
export class CareHomeDetails {

  care_home: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public care_homeApi: CareHomeApi,
    public alertController: AlertController,
    public toastController: ToastController,
    public respUtility: ResponseUtility) {
    this.care_home = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareHomesDetails');
  }

  editCareHome(care_home) {
    this.navCtrl.push(CareHomeForm, care_home);
  }

  deleteCareHome(care_home) {
    this.care_homeApi.deleteCareHome(care_home).subscribe(
      response => {
        this.respUtility.showSuccess("Deleted CareHomes");
        this.navCtrl.pop();
      },
      error => {
        this.respUtility.showFailure(error);
      }
    );
  }

  confirmDelete(care_home) {
    this.respUtility.confirmDelete(this.deleteCareHome.bind(this), care_home);      
  }
}
