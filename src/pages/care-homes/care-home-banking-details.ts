import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { CareHomeApi } from '../../providers/care-home-api';
import { ResponseUtility } from '../../providers/response-utility';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'page-bank-details',
  templateUrl: 'care-home-banking-details.html',
})
export class CareHomeBankingDetails {

  care_home: {};
  role = null;
  slideOneForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public care_homeApi: CareHomeApi,
    public respUtility: ResponseUtility,
    public loadingController: LoadingController,
    private tokenService: Angular2TokenService) {

    this.slideOneForm = formBuilder.group({
      bank_account: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(8), Validators.required])],
      sort_code: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(6), Validators.required])],
    });

    this.care_home = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankingDetailsPage');
  }

  save() {

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
          this.navCtrl.popToRoot();
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
