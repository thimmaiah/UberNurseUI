import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { StaffingResponseForm } from '../staffing-response/staffing-response-form';
import { StaffingResponseApi } from '../../providers/staffing-response-api';
import { ResponseUtility } from '../../providers/response-utility';


@Component({
  selector: 'page-staffing-response-details',
  templateUrl: 'staffing-response-details.html',
})
export class StaffingResponseDetails {

  staffingResponse: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public staffingResponseApi: StaffingResponseApi,
    public alertController: AlertController,
    public toastController: ToastController,
    public respUtility: ResponseUtility) {
    this.staffingResponse = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffingResponsesDetails');
  }

  editStaffingResponse(staffingResponse) {
    this.navCtrl.push(StaffingResponseForm, staffingResponse);
  }

  acceptResponse(staffingResponse) {
    staffingResponse.accepted = true;
    staffingResponse.response_status = "Accepted"
    this.updateResponse(staffingResponse);
  }
  rejectResponse(staffingResponse) {
    staffingResponse.accepted = false;
    staffingResponse.response_status = "Rejected"
    this.updateResponse(staffingResponse);
  }
  updateResponse(staffingResponse) {
    this.staffingResponseApi.updateStaffingResponse(staffingResponse).subscribe(
      staffingResponse => {
        this.respUtility.showSuccess('Response Updated');
      },
      error => {
        this.respUtility.showFailure(error);
      }
    );
  }

  deleteStaffingResponse(staffingResponse) {
    this.staffingResponseApi.deleteStaffingResponse(staffingResponse).subscribe(
      response => {
        this.respUtility.showSuccess("Deleted StaffingResponses");
        this.navCtrl.pop();
      },
      error => {
        this.respUtility.showFailure(error);
      }
    );
  }

  confirmDelete(staffingResponse) {
    this.respUtility.confirmDelete(this.deleteStaffingResponse.bind(this), staffingResponse);
  }
}
