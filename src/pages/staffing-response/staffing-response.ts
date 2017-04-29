import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StaffingResponseApi } from '../../providers/staffing-response-api';
import { ResponseUtility } from '../../providers/response-utility';
import { StaffingResponseDetails } from '../staffing-response/staffing-response-details'

@IonicPage()
@Component({
  selector: 'page-staffing-response',
  templateUrl: 'staffing-response.html',
})
export class StaffingResponse {

  staffingResponses: any;
  staffingResponse: any;
  staffingRequest: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController: LoadingController,
    public staffingResponseApi: StaffingResponseApi, public respUtility: ResponseUtility) {
    this.staffingRequest = this.navParams.data;
  }


  loadAllResponses() {
    let loader = this.loadingController.create({
      content: 'Loading StaffingResponsess...'
    });

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
      content: 'Loading StaffingResponsess...'
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
