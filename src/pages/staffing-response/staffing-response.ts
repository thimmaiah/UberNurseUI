import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StaffingResponseApi } from '../../providers/staffing-response-api';
import { ResponseUtility } from '../../providers/response-utility';
import { StaffingResponseDetails } from '../staffing-response/staffing-response-details'
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'page-staffing-response',
  templateUrl: 'staffing-response.html',
})
export class StaffingResponse {

  staffingResponses: any;
  staffingResponse: any;
  staffingRequest: any;
  current_user: {};
  verification_pending = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private tokenService: Angular2TokenService,
    public loadingController: LoadingController,
    public staffingResponseApi: StaffingResponseApi, 
    public respUtility: ResponseUtility) {

    this.staffingRequest = this.navParams.data;
    this.current_user = tokenService.currentUserData;
    if (this.current_user["role"] == "Care Giver" || this.current_user["role"] == "Nurse") {
      this.verification_pending = !this.current_user["verified"];
      console.log(`StaffingResponse: verification_pending = ${this.verification_pending}`);
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
    this.staffingResponseApi.getStaffingResponses(staffing_request_id).subscribe(
      staffingResponses => {
        this.staffingResponses = staffingResponses;
        console.log("Loaded staffingResponses");
      },
      error => { this.respUtility.showFailure(error); loader.dismiss(); },
      () => { loader.dismiss(); }
    );
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter StaffingResponsess');
    this.loadAllResponses();
  }

  getStaffingResponseDetails(staffingResponse) {
    let loader = this.loadingController.create({
      content: 'Loading Responses...'
    });

    loader.present()
    this.staffingResponseApi.getStaffingResponseDetails(staffingResponse.id).subscribe(
      staffingResponse => {
        this.staffingResponse = staffingResponse;
        console.log("got staffingResponse " + staffingResponse);
        this.navCtrl.push(StaffingResponseDetails, staffingResponse);
      },
      error => { this.respUtility.showFailure(error); loader.dismiss(); },
      () => { loader.dismiss(); }
    );

  }
}
