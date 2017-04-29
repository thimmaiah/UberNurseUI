import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { StaffingRequestForm } from '../staffing-request/staffing-request-form';
import { StaffingRequestApi } from '../../providers/staffing-request-api';
import { ResponseUtility } from '../../providers/response-utility';
import { StaffingResponse } from '../staffing-response/staffing-response';
/**
 * Generated class for the StaffingRequestsDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-staffing-request-details',
  templateUrl: 'staffing-request-details.html',
})
export class StaffingRequestDetails {

  staffingRequest: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public staffingRequestApi: StaffingRequestApi,
    public alertController: AlertController,
    public toastController: ToastController,
    public respUtility: ResponseUtility) {
    this.staffingRequest = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffingRequestsDetails');
  }

  editStaffingRequest(staffingRequest) {
    this.navCtrl.push(StaffingRequestForm, staffingRequest);
  }

  deleteStaffingRequest(staffingRequest) {
    this.staffingRequestApi.deleteStaffingRequest(staffingRequest).subscribe(
      response => {
        this.respUtility.showSuccess("Deleted StaffingRequests");
        this.navCtrl.pop();
      },
      error => {
        this.respUtility.showFailure(error);
      }
    );
  }

  showResponses(staffing_request) {
    this.navCtrl.push(StaffingResponse, staffing_request);
  }

  confirmDelete(staffingRequest) {
    this.respUtility.confirmDelete(this.deleteStaffingRequest.bind(this), staffingRequest);      
  }

  sendResponse() {

  }
}
