import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { CareHomeForm } from '../care-homes/care-home-form';
import { CareHomeApi } from '../../providers/care-home-api';
import { ResponseUtility } from '../../providers/response-utility';
import { AngularTokenService } from 'angular-token';

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

  care_home: {};
  current_user: {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private tokenService: AngularTokenService,
    public care_homeApi: CareHomeApi,
    public alertController: AlertController,
    public toastController: ToastController,
    public respUtility: ResponseUtility) {

    this.care_home = this.navParams.data;
    this.current_user = tokenService.currentUserData;  
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CareHomeDetails');
    this.respUtility.trackView("CareHomeDetails");
  }

  editCareHome(care_home) {
    this.respUtility.trackEvent("CareHome", "Edit", "click");
    this.navCtrl.push(CareHomeForm, care_home);
  }

  confirmClaim(care_home) {
    this.respUtility.confirmAction(this.claimCareHome.bind(this), care_home, "Our support staff will verify your claim and add you as an admin for this Partner. Proceed ?");      
  }

  claimCareHome(care_home) {
    this.respUtility.trackEvent("CareHome", "Claim", "click");
    this.care_homeApi.claim(care_home, this.current_user["id"]).subscribe(
      response => {
        this.respUtility.showSuccess("Our support will verify and add you as an admin for this Partner.");
        this.navCtrl.pop();
      },
      error => {
        this.respUtility.showFailure(error);
      }
    );
  }


  deleteCareHome(care_home) {
    this.respUtility.trackEvent("CareHome", "Delete", "click");    
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
