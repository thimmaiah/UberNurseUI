import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { ShiftApi } from '../../providers/shift-api';
import { ResponseUtility } from '../../providers/response-utility';


@Component({
  selector: 'page-shift-form',
  templateUrl: 'shift-form.html',
})
export class ShiftForm {

  shift: {};
  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  submitAttempt: boolean = false;
  start_code_present = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public shiftApi: ShiftApi,
    public respUtility: ResponseUtility) {

    this.shift = this.navParams.data;
    this.start_code_present = this.shift["start_code"] != null

    this.slideOneForm = formBuilder.group({

      start_code: ['', Validators.compose([Validators.maxLength(30)])],
      end_code: ['', Validators.compose([Validators.maxLength(30)])]

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShiftsForm');
  }

  isAcceptedResponse() {
    return this.shift["response_status"] == "Accepted";
  }

  confirmSave() {
    let message = "";
    if (this.shift["start_code"] && this.shift["end_code"] == null) {
      message = "This will start your shift and set the shift start time to now. Start shift now?";
    } else {
      message = "This will end your shift and set the shift end time to now. End shift now?";
    }

    this.respUtility.confirmAction(this.save.bind(this), null, message);
  }


  save() {
    this.submitAttempt = true;
    //console.log(this.shift);
    let loader = this.loadingController.create({
      content: 'Saving ...'
    });

    if (!this.slideOneForm.valid) {

    }
    else {
      this.submitAttempt = false;
      loader.present();

      if (this.shift["id"]) {
        this.shiftApi.updateShift(this.shift).map(res => {
          console.log(`Shift = ${res}`);
        }).subscribe(
          shift => {
            this.respUtility.showSuccess('Code Accepted.');
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
        this.shiftApi.createShift(this.shift).subscribe(
          shift => {
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
