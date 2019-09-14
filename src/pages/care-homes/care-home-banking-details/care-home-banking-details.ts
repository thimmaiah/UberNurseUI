import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Events } from 'ionic-angular';
import { CareHomeApi } from '../../../providers/care-home-api';
import { ResponseUtility } from '../../../providers/response-utility';

@IonicPage()
@Component({
  selector: 'page-bank-details',
  templateUrl: 'care-home-banking-details.html',
})
export class CareHomeBankingDetails {

  care_home: {};
  role = null;
  slideOneForm: FormGroup;
  submitAttempt: boolean = false;
  insideSettingsTab = false;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public care_homeApi: CareHomeApi,
    public respUtility: ResponseUtility,
    public loadingController: LoadingController,
    private tokenService: AngularTokenService,
    public events: Events) {

    this.slideOneForm = formBuilder.group({
      bank_account: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.required])],
      sort_code: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(6), Validators.required])]
    });

    let current_care_home = this.tokenService.currentUserData["care_home"];
    // This is a hack. We may need to display accept bank transactions in UI at some point
    // For now banking details are not used so.
    current_care_home.accept_bank_transactions = true;

    this.care_home = {
      "id": current_care_home.id,
      "bank_account": current_care_home["bank_account"],
      "sort_code": current_care_home["sort_code"],
      "accept_bank_transactions": current_care_home["accept_bank_transactions"]
    }

    if (this.navParams.data["insideSettingsTab"]) {
      this.insideSettingsTab = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareHomeBankingDetails');
    this.respUtility.trackView("CareHomeBankingDetails");
  }

  save() {

    this.respUtility.trackEvent("User", "CareHomeBankingDetails", "save");
    this.submitAttempt = true;
    //console.log(this.care_home);
    let loader = this.loadingController.create({
      content: 'Saving ...'
    });

    if (this.slideOneForm.invalid) {
      //this.signupSlider.slideTo(0);
      console.log("Invalid form ", this.slideOneForm.errors);
    }
    else {
      this.submitAttempt = false;
      loader.present();

      this.care_homeApi.updateCareHome(this.care_home).subscribe(
        care_home => {
          this.respUtility.showSuccess('Saved successfully.');
          this.events.publish("care_home:registration:success", care_home);
          if(!this.insideSettingsTab) {
            this.navCtrl.popToRoot();
          }
        },
        error => {
          this.respUtility.showFailure(error);
          loader.dismiss();
        },
        () => { loader.dismiss(); }
      );

    }
  }

}
