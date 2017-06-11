import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
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
    public loadingController: LoadingController,
    public staffingResponseApi: StaffingResponseApi,
    public respUtility: ResponseUtility) {

    this.staffingResponse = this.navParams.data;
    if (this.isAcceptedResponse()) {
      // This is an approved response.
      // Ensure start and end code becomes mandatory
      this.slideOneForm = formBuilder.group({

        start_code: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
        end_code: ['', Validators.compose([Validators.maxLength(30)])]

      });
    } else {
      // This is an new response.
      // Ensure start and end code are NOT mandatory
      this.slideOneForm = formBuilder.group({
        start_code: [],
        end_code: []
      });
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffingResponsesForm');
  }

  isAcceptedResponse() {
    return this.staffingResponse["response_status"] == "Accepted";
  }

  save() {
    this.submitAttempt = true;
    //console.log(this.staffingResponse);
    let loader = this.loadingController.create({
      content: 'Saving ...'
    });

    if (!this.slideOneForm.valid) {

    }
    else {
      this.submitAttempt = false;
      loader.present();

      if (this.staffingResponse["id"]) {
        this.staffingResponseApi.updateStaffingResponse(this.staffingResponse).map(res => {
          console.log(`Response = ${res}`);
        }).subscribe(
          staffingResponse => {
            this.respUtility.showSuccess('Shift saved successfully.');
            this.navCtrl.pop();
          },
          error => {
            if (error.status === 422) {
              let error_response = JSON.parse(error._body);
              let msg = "";
              for (var key in error_response) {
                msg += error_response[key] + ". ";
              }
              this.respUtility.showWarning(msg);
              loader.dismiss();
            }
            else {
              this.respUtility.showFailure(error);
              loader.dismiss();
            }
          },
          () => { loader.dismiss(); }
          );
      } else {
        this.staffingResponseApi.createStaffingResponse(this.staffingResponse).subscribe(
          staffingResponse => {
            this.respUtility.showSuccess('Shift saved successfully.');
            this.navCtrl.pop();
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

}
