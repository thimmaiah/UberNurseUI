import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { StaffingRequestApi } from '../../providers/staffing-request-api';
import { ResponseUtility } from '../../providers/response-utility';


//@IonicPage()
@Component({
  selector: 'page-staffing-request-form',
  templateUrl: 'staffing-request-form.html',
})
export class StaffingRequestForm {

  todayStr: any;
  staffingRequest: {};
  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public staffingRequestApi: StaffingRequestApi,
    public respUtility: ResponseUtility) {

    this.staffingRequest = this.navParams.data;

    this.slideOneForm = formBuilder.group({

      start_date: ['', Validators.compose([Validators.maxLength(30), Validators.required])],

      end_date: ['', Validators.compose([Validators.maxLength(30), Validators.required])],

      rate_per_hour: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^\\d+$'), Validators.required])],

      request_status: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],

      auto_deny_in: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^\\d+$'), Validators.required])],

      payment_status: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],

      start_code: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^\\d+$'), Validators.required])],

      end_code: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^\\d+$'), Validators.required])],

    });

    this.slideTwoForm = formBuilder.group({


    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffingRequestsForm');
    let today = new Date();
    today.setHours(0, 0, 0);
    this.todayStr = today.toISOString();
    console.log(today.toLocaleString());
    console.log(today.toISOString());
    if (!this.staffingRequest["start_date"]) {
      this.staffingRequest["start_date"] = this.todayStr;
      today.setHours(today.getHours() + 5);
      this.staffingRequest["end_date"] = today.toISOString();
    }
  }

  getLocalDate(date) {
    let n: number = date.getTime();
    n -= (date.getTimezoneOffset() * 60 * 1000);
    let d: string = new Date(n).toISOString();
    return d;
  }

  save() {
    this.submitAttempt = true;
    //console.log(this.staffingRequest);
    let loader = this.loadingController.create({
      content: 'Saving ...'
    });

    if (!this.slideOneForm.valid) {
      
    }
    else {
      this.submitAttempt = false;
      loader.present();
      // Due to a bug in ion-datetime - its not sending the appropriate timezone info
      // So we need to trim the last Z char from the datetime sent. Else we run into problems
      this.staffingRequest["start_date"] = this.staffingRequest["start_date"].substring(0, this.staffingRequest["start_date"].length - 1) + "GMT+5:30";
      this.staffingRequest["end_date"] = this.staffingRequest["end_date"].substring(0, this.staffingRequest["end_date"].length - 1) + "GMT+5:30";

      if (this.staffingRequest["id"]) {
        this.staffingRequestApi.updateStaffingRequest(this.staffingRequest).subscribe(
          staffingRequest => {
            this.respUtility.showSuccess('Request saved successfully.');
            this.navCtrl.pop();
          },
          error => {
            this.respUtility.showFailure(error);
            loader.dismiss();
          },
          () => { loader.dismiss(); }
        );
      } else {
        this.staffingRequestApi.createStaffingRequest(this.staffingRequest).subscribe(
          staffingRequest => {
            this.respUtility.showSuccess('Request saved successfully. We will notify you when we fill the slot with a Care Giver.');
            this.navCtrl.pop();
          },
          error => {
            this.respUtility.showFailure(error);
            loader.dismiss();
          },
          () => { loader.dismiss() }
        );
      }
    }
  }

}
