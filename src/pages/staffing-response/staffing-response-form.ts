import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { StaffingResponseApi } from '../../providers/staffing-response-api';
import { ResponseUtility } from '../../providers/response-utility';


@Component({
  selector: 'page-staffing-response-form',
  templateUrl: 'staffing-response-form.html',
})
export class StaffingResponseForm {

  staffingResponse: {};
  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public staffingResponseApi: StaffingResponseApi,
    public respUtility: ResponseUtility) {

    this.staffingResponse = this.navParams.data;
    if (this.isAcceptedResponse()) {
      // This is an approved response.
      // Ensure start and end code becomes mandatory
      this.slideOneForm = formBuilder.group({

        start_code: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        end_code: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])]

      });
    } else {
      // This is an new response.
      // Ensure start and end code are NOT mandatory
      this.slideOneForm = formBuilder.group({
        start_code:[],
        end_code:[]
      });
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffingResponsesForm');
  }


  next() {
    this.signupSlider.slideNext();
  }

  prev() {
    this.signupSlider.slidePrev();
  }

  isAcceptedResponse() {
    return this.staffingResponse["response_status"] == "Accepted";
  }

  save() {
    this.submitAttempt = true;
    //console.log(this.staffingResponse);


    if (!this.slideOneForm.valid) {
      this.signupSlider.slideTo(0);
    }
    else {
      this.submitAttempt = false;
      if (this.staffingResponse["id"]) {
        this.staffingResponseApi.updateStaffingResponse(this.staffingResponse).subscribe(
          staffingResponse => {
            this.respUtility.showSuccess('Responses saved successfully.');
            this.navCtrl.pop();
          },
          error => {
            this.respUtility.showFailure(error);
          }
        );
      } else {
        this.staffingResponseApi.createStaffingResponse(this.staffingResponse).subscribe(
          staffingResponse => {
            this.respUtility.showSuccess('Responses saved successfully.');
            this.navCtrl.pop();
          },
          error => {
            this.respUtility.showFailure(error);
          }
        );
      }
    }
  }

}
