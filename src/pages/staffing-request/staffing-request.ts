import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StaffingRequestApi } from '../../providers/staffing-request-api';
import { ResponseUtility } from '../../providers/response-utility';
import { StaffingRequestDetails } from '../staffing-request/staffing-request-details'

/**
 * Generated class for the StaffingRequestss page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-staffing-requests',
  templateUrl: 'staffing-requests.html',
})
export class StaffingRequest {

  staffingRequests: any;
  staffingRequest: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController: LoadingController, 
    public staffingRequestApi: StaffingRequestApi, public respUtility: ResponseUtility) {
  }

  

  ionViewWillEnter() {
    console.log('ionViewWillEnter StaffingRequestss');

    let loader = this.loadingController.create({
      content: 'Loading StaffingRequestss...'
    });


    this.staffingRequestApi.getStaffingRequests().subscribe(
      staffingRequests => {
        this.staffingRequests = staffingRequests;
        console.log("Loaded staffingRequests");
      },
      error => { this.respUtility.showFailure(error); },
      () => { loader.dismiss(); }
    );

  }

  getStaffingRequestDetails(staffingRequest) {
    let loader = this.loadingController.create({
      content: 'Loading StaffingRequestss...'
    });

    loader.present()
    this.staffingRequestApi.getStaffingRequestDetails(staffingRequest.id).subscribe(
      staffingRequest => {
        this.staffingRequest = staffingRequest;
        console.log("got staffingRequest " + staffingRequest);
        this.navCtrl.push(StaffingRequestDetails, staffingRequest);
      },
      error => { this.respUtility.showFailure(error); },
      () => { loader.dismiss(); }
    );

  }
}
