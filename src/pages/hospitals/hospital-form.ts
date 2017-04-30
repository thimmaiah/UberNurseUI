import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { HospitalApi } from '../../providers/hospital-api';
import { ResponseUtility } from '../../providers/response-utility';

/**
 * Generated class for the HospitalsForm page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-hospital-form',
  templateUrl: 'hospital-form.html',
})
export class HospitalForm {

  hospital: {};
  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public hospitalApi: HospitalApi,
    public respUtility: ResponseUtility) {

    this.hospital = this.navParams.data;

    this.slideOneForm = formBuilder.group({
       
      name: ['', Validators.compose([Validators.maxLength(30), Validators.required])],       
      address: ['', Validators.compose([Validators.maxLength(30), Validators.required])],       
      street: ['', Validators.compose([Validators.maxLength(30), Validators.required])],       
      locality: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      town: ['', Validators.compose([Validators.maxLength(30), Validators.required])],       
      postcode: ['', Validators.compose([Validators.maxLength(30), Validators.required])],       
      base_rate: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^\\d+$'), Validators.required])]  
    });

    this.slideTwoForm = formBuilder.group({
            
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HospitalsForm');
  }


  save() {
    this.submitAttempt = true;
    //console.log(this.hospital);


    if (!this.slideOneForm.valid) {
      this.signupSlider.slideTo(0);
    }
    else {
      this.submitAttempt = false;
      if (this.hospital["id"]) {
        this.hospitalApi.updateHospital(this.hospital).subscribe(
          hospital => {
            this.respUtility.showSuccess('Hospitals saved successfully.');
          },
          error => {
            this.respUtility.showFailure(error);
          }
        );
      } else {
        this.hospitalApi.createHospital(this.hospital).subscribe(
          hospital => {
            this.respUtility.showSuccess('Hospitals saved successfully.');
          },
          error => {
            this.respUtility.showFailure(error);
          }
        );
      }
    }
  }

}
