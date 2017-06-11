import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StaffingRequestForm } from '../staffing-request/staffing-request-form';
import { StaffingRequestApi } from '../../providers/staffing-request-api';
import { ResponseUtility } from '../../providers/response-utility';
import { Shift } from '../shift/shift';
import { ShiftForm } from '../shift/shift-form';
import { Angular2TokenService } from 'angular2-token';
import { ActionSheetController, Platform } from 'ionic-angular';

import * as _ from 'lodash';
import * as moment from 'moment';

//@IonicPage()
@Component({
  selector: 'page-staffing-request-details',
  templateUrl: 'staffing-request-details.html',
})
export class StaffingRequestDetails {

  staffingRequest: any;
  current_user = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public platform: Platform,
    private tokenService: Angular2TokenService,
    public staffingRequestApi: StaffingRequestApi,
    public actionSheetCtrl: ActionSheetController,
    public respUtility: ResponseUtility) {

    this.staffingRequest = this.navParams.data;
    this.current_user = this.tokenService.currentUserData;

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
    let loader = this.loadingController.create({
      content: 'Deleting Request...'
    });

    loader.present();

    this.staffingRequestApi.deleteStaffingRequest(staffingRequest).subscribe(
      response => {
        this.respUtility.showSuccess("Deleted StaffingRequests");
        this.navCtrl.pop();
      },
      error => { this.respUtility.showFailure(error); loader.dismiss(); },
      () => { loader.dismiss(); }
    );
  }

  updateStaffingRequest(staffingRequest) {
    let loader = this.loadingController.create({
      content: 'Updating Request...'
    });

    loader.present();
    this.staffingRequestApi.updateStaffingRequest(staffingRequest).subscribe(
      response => {
        this.respUtility.showSuccess("Request Updated");
      },
      error => { this.respUtility.showFailure(error); loader.dismiss(); },
      () => { loader.dismiss(); }
    );
  }


  showResponses(staffing_request) {
    this.navCtrl.push(Shift, staffing_request);
  }

  confirmDelete(staffingRequest) {
    this.respUtility.confirmDelete(this.deleteStaffingRequest.bind(this), staffingRequest);
  }

  sendResponse(staffing_request) {
    let shift = {};
    shift["staffing_request_id"] = staffing_request.id;
    shift["care_home_id"] = staffing_request.care_home_id;
    this.navCtrl.push(ShiftForm, shift);
  }

  hasUserResponded() {
    let current_user = this.tokenService.currentUserData;
    let has_responded = _.find(this.staffingRequest["shifts"], function (response) {
      console.log(`Matching ${response["user_id"]} with ${current_user["id"]}`)
      return parseInt(response["user_id"]) == current_user["id"];
    });

    console.log(`has_responded = ${has_responded}`);
    return has_responded;
  }

  presentActionSheet(staffingRequest) {
    let buttons = [];

    if (staffingRequest.can_manage == true) {
      console.log("can manage staffingRequest");
      buttons = buttons.concat([
        {
          text: 'Edit',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            console.log('Edit clicked');
            this.editStaffingRequest(staffingRequest);
          }
        }, {
          text: 'Cancel',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Cancel clicked');
            this.confirmDelete(staffingRequest);
          }
        }, {
          text: 'Show Shifts Assigned',
          icon: !this.platform.is('ios') ? 'list' : null,
          handler: () => {
            console.log('Show Shifts clicked');
            this.showResponses(staffingRequest);
          }
        }
      ]);
    }
    // else {
    //   if (!this.hasUserResponded()) {
    //     buttons = buttons.concat([
    //       {
    //         text: 'Apply Now',
    //         icon: !this.platform.is('ios') ? 'checkmark' : null,
    //         handler: () => {
    //           console.log('Apply clicked');
    //           this.sendResponse(staffingRequest);
    //         }
    //       }
    //     ]);
    //   }
    // }

    buttons = buttons.concat([
      {
        text: 'Hide Menu',
        role: 'cancel',
        icon: !this.platform.is('ios') ? 'close' : null,
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]);

    let title = buttons.length == 1 ? "No action required" : "Actions";

    console.log(buttons);

    let actionSheet = this.actionSheetCtrl.create({
      title: title,
      cssClass: 'action-sheets',
      buttons: buttons
    });
    actionSheet.present();
  }
}
