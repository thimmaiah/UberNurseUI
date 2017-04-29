import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { StaffingResponseForm } from '../staffing-response/staffing-response-form';
import { StaffingRequestDetails } from '../staffing-request/staffing-request-details';
import { StaffingResponseApi } from '../../providers/staffing-response-api';
import { ResponseUtility } from '../../providers/response-utility';
import { ActionSheetController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-staffing-response-details',
  templateUrl: 'staffing-response-details.html',
})
export class StaffingResponseDetails {

  staffingResponse: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform,
    public staffingResponseApi: StaffingResponseApi,
    public alertController: AlertController,
    public toastController: ToastController,
    public actionSheetCtrl: ActionSheetController,
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
        this.respUtility.showSuccess("Deleted Response");
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

  showRequest(staffingResponse) {
    let staffingRequest = {}
    staffingRequest["id"] = staffingResponse["staffing_request_id"];
    this.navCtrl.push(StaffingRequestDetails, staffingRequest);
  }

   presentActionSheet(staffingResponse) {
    let buttons = [];

    if (staffingResponse.can_manage == true) {
      console.log("can manage staffingResponse");
      buttons = buttons.concat([
        {
          text: 'Edit',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            console.log('Edit clicked');
            this.editStaffingResponse(staffingResponse);
          }
        }, {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
            this.confirmDelete(staffingResponse);
          }
        }, {
          text: 'Show Request',
          icon: !this.platform.is('ios') ? 'folder' : null,
          handler: () => {
            console.log('Show Request clicked');
            this.showRequest(staffingResponse);
          }
        }
      ]);
    } else {
    
        buttons = buttons.concat([
          {
            text: 'Accept Response',
            icon: !this.platform.is('ios') ? 'checkmark' : null,
            handler: () => {
              console.log('Accept clicked');
              this.acceptResponse(staffingResponse);
            }
          }, 
          {
            text: 'Reject Response',
            role: 'destructive',
            icon: !this.platform.is('ios') ? 'close-circle' : null,
            handler: () => {
              console.log('Deny clicked');
              this.rejectResponse(staffingResponse);
            }
          }
        ]);
    }

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
