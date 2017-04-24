import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { StaffingRequestApi } from '../../providers/staffing-request-api';
import { ResponseUtility } from '../../providers/response-utility';

/**
 * Generated class for the StaffingRequestsForm page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-staffing-request-form',
  templateUrl: 'staffing-request-form.html',
})
export class StaffingRequestForm {

  staffingRequest: {};
  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public staffingRequestApi: StaffingRequestApi,
    public respUtility: ResponseUtility) {

    this.staffingRequest = this.navParams.data;

    this.slideOneForm = formBuilder.group({

      start_date: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],

      end_date: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],

      rate_per_hour: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],

      request_status: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],

    });

    this.slideTwoForm = formBuilder.group({
      
      auto_deny_in: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],

      response_count: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],

      payment_status: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],

      start_code: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],

      end_code: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffingRequestsForm');
  }


  next() {
    this.signupSlider.slideNext();
  }

  prev() {
    this.signupSlider.slidePrev();
  }

  save() {
    this.submitAttempt = true;
    //console.log(this.staffingRequest);


    if (!this.slideOneForm.valid) {
      this.signupSlider.slideTo(0);
    }
    else if (!this.slideTwoForm.valid) {
      this.signupSlider.slideTo(1);
    }
    else {
      if (this.staffingRequest["id"]) {
        this.staffingRequestApi.updateStaffingRequest(this.staffingRequest).subscribe(
          staffingRequest => {
            this.respUtility.showSuccess('StaffingRequests saved successfully.');
          },
          error => {
            this.respUtility.showFailure(error);
          }
        );
      } else {
        this.staffingRequestApi.createStaffingRequest(this.staffingRequest).subscribe(
          staffingRequest => {
            this.respUtility.showSuccess('StaffingRequests saved successfully.');
          },
          error => {
            this.respUtility.showFailure(error);
          }
        );
      }
    }
  }

}
