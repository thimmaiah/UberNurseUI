import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { StaffingRequestForm } from '../staffing-request/staffing-request-form';
import { StaffingRequestApi } from '../../providers/staffing-request-api';
import { ResponseUtility } from '../../providers/response-utility';
import { StaffingResponse } from '../staffing-response/staffing-response';
import { StaffingResponseForm } from '../staffing-response/staffing-response-form';
import { Angular2TokenService } from 'angular2-token';
import * as _ from 'lodash';

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
    private tokenService: Angular2TokenService,
    public staffingRequestApi: StaffingRequestApi,
    public alertController: AlertController,
    public toastController: ToastController,
    public respUtility: ResponseUtility) {

    this.staffingRequest = this.navParams.data;
    // Sometimes we get a shallow req - ie one that has only the id. 
    // We need to fill it up from the server side
    if (!this.staffingRequest.user && this.staffingRequest.id) {
      this.staffingRequestApi.getStaffingRequestDetails(this.staffingRequest.id).subscribe(
        staffingRequest => {
            this.staffingRequest = staffingRequest;
        },
        error => {
          this.respUtility.showFailure(error);
        }
      );
    }
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

  updateStaffingRequest(staffingRequest) {
    this.staffingRequestApi.updateStaffingRequest(staffingRequest).subscribe(
      response => {
        this.respUtility.showSuccess("Request Updated");
      },
      error => {
        this.respUtility.showFailure(error);
      }
    );
  }

  approveRequest(staffingRequest) {
    staffingRequest.request_status = "Approved"
    this.updateStaffingRequest(staffingRequest);
  }

  denyRequest(staffingRequest) {
    staffingRequest.request_status = "Denied"
    this.updateStaffingRequest(staffingRequest);
  }

  showResponses(staffing_request) {
    this.navCtrl.push(StaffingResponse, staffing_request);
  }

  confirmDelete(staffingRequest) {
    this.respUtility.confirmDelete(this.deleteStaffingRequest.bind(this), staffingRequest);
  }

  confirmApprove(staffingRequest) {
    this.respUtility.confirmAction(this.approveRequest.bind(this), staffingRequest, "Once approved the request cannot be modified. Are you sure?");
  }

  confirmDeny(staffingRequest) {
    this.respUtility.confirmAction(this.denyRequest.bind(this), staffingRequest, "Deny the current request. Are you sure?");
  }

  canApprove(staffing_request) {
    return (staffing_request.can_manage == true && staffing_request.request_status != "Approved");
  }

  sendResponse(staffing_request) {
    let staffing_response = {};
    staffing_response["staffing_request_id"] = staffing_request.id;
    staffing_response["hospital_id"] = staffing_request.hospital_id;
    this.navCtrl.push(StaffingResponseForm, staffing_response);
  }

  hasUserResponded() {
    let current_user = this.tokenService.currentUserData;
    let has_responded = _.find(this.staffingRequest["staffing_responses"], function (response) {
      console.log(`Matching ${response["user_id"]} with ${current_user["id"]}`)
      return parseInt(response["user_id"]) == current_user["id"];
    });

    console.log(`has_responded = ${has_responded}`);
    return has_responded;
  }
}
