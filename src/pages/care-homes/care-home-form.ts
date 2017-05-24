import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { CareHomeApi } from '../../providers/care-home-api';
import { ResponseUtility } from '../../providers/response-utility';

/**
 * Generated class for the CareHomesForm page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-care-home-form',
  templateUrl: 'care-home-form.html',
})
export class CareHomeForm {

  care_home: {};
  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public care_homeApi: CareHomeApi,
    public respUtility: ResponseUtility) {

    this.care_home = this.navParams.data;

    this.slideOneForm = formBuilder.group({
       
      name: ['', Validators.compose([Validators.required])],       
      address: ['', Validators.compose([Validators.required])],       
      town: ['', Validators.compose([Validators.required])],       
      postcode: ['', Validators.compose([Validators.maxLength(8), Validators.required])],       
      image_url: ['']  
    });

    this.slideTwoForm = formBuilder.group({
            
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareHomesForm');
  }


  save() {
    this.submitAttempt = true;
    //console.log(this.care_home);
    let loader = this.loadingController.create({
      content: 'Saving ...'
    });

    if (!this.slideOneForm.valid) {
    }
    else {
      this.submitAttempt = false;
      loader.present();

      if (this.care_home["id"]) {
        this.care_homeApi.updateCareHome(this.care_home).subscribe(
          care_home => {
            this.navCtrl.pop();
            this.respUtility.showSuccess('CareHome saved successfully.');
          },
          error => {
            this.respUtility.showFailure(error);
            loader.dismiss();
          },
          () => {loader.dismiss();}
        );
      } else {
        this.care_homeApi.createCareHome(this.care_home).subscribe(
          care_home => {
            this.navCtrl.popToRoot();
            this.respUtility.showSuccess('CareHome saved successfully. We will inform you once this has been verified');
          },
          error => {
            this.respUtility.showFailure(error);
            loader.dismiss();
          },
          () => {loader.dismiss();}
        );
      }
    }
  }

}
