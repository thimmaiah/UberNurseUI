import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ShiftApi } from '../../providers/shift-api';
import { ResponseUtility } from '../../providers/response-utility';
import { ShiftDetails } from '../shift/shift-details'
import { Angular2TokenService } from 'angular2-token';
import * as moment from 'moment';

@Component({
  selector: 'page-shift',
  templateUrl: 'shift.html',
})
export class Shift {

  shifts: any;
  shift: any;
  staffingRequest: any;
  current_user: {};
  verification_pending = false;
  response_status = null;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private tokenService: Angular2TokenService,
    public loadingController: LoadingController,
    public shiftApi: ShiftApi, 
    public respUtility: ResponseUtility) {

    this.staffingRequest = this.navParams.data["staffing_request"];
    this.response_status = this.navParams.data["response_status"];

    this.current_user = tokenService.currentUserData;
    if (this.current_user["role"] == "Care Giver" || this.current_user["role"] == "Nurse") {
      this.verification_pending = !this.current_user["verified"];
      console.log(`Shift: verification_pending = ${this.verification_pending}`);
    }

  }


  loadAllResponses() {
    let loader = this.loadingController.create({
      content: 'Loading Responses...'
    });

    loader.present();

    let staffing_request_id = null;
    if (this.staffingRequest) {
      // Show the responses for this request
      staffing_request_id = this.staffingRequest.id;
    }
    this.shiftApi.getShifts(staffing_request_id, this.response_status).subscribe(
      shifts => {
        this.shifts = shifts;
        // this.shifts.forEach(shift => {
        //   this.setUTCDates(shift);          
        // });
        console.log("Loaded shifts");
      },
      error => { this.respUtility.showFailure(error); loader.dismiss(); },
      () => { loader.dismiss(); }
    );
  }

  setUTCDates(shift) {
    // This is required as ios misbehvaes with timezones.
    // We always send the UTC time back
    shift.staffing_request.start_date = moment(shift.staffing_request.start_date).utcOffset(0).toISOString();
    shift.staffing_request.end_date = moment(shift.staffing_request.end_date).utcOffset(0).toISOString();

    if(shift.start_date) {
      shift.start_date = moment(shift.start_date).utcOffset(0).toISOString();
    }
    if(shift.end_date) {
      shift.end_date = moment(shift.end_date).utcOffset(0).toISOString();
    }

    console.log("Request: start_date", shift.staffing_request.start_date);
    console.log("Request: end_date", shift.staffing_request.end_date);
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter Shiftss');
    this.loadAllResponses();
  }

  getShiftDetails(shift) {
    let loader = this.loadingController.create({
      content: 'Loading Responses...'
    });

    loader.present()
    this.shiftApi.getShiftDetails(shift.id).subscribe(
      shift => {
        this.shift = shift;
        console.log("got shift " + shift);
        this.navCtrl.push(ShiftDetails, shift);
      },
      error => { this.respUtility.showFailure(error); loader.dismiss(); },
      () => { loader.dismiss(); }
    );

  }
}
