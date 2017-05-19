import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StaffingResponseForm } from '../staffing-response/staffing-response-form';
import { PaymentForm } from '../payment/payment-form';
import { PaymentDetails } from '../payment/payment-details';
import { RatingForm } from '../rating/rating-form';
import { RatingDetails } from '../rating/rating-details';
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
    public actionSheetCtrl: ActionSheetController,
    public loadingController: LoadingController,
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

    let loader = this.loadingController.create({
      content: 'Updating Responses...'
    });

    loader.present();

    this.staffingResponseApi.updateStaffingResponse(staffingResponse).subscribe(
      staffingResponse => {
        this.respUtility.showSuccess('Response Updated');
      },
      error => { this.respUtility.showFailure(error); loader.dismiss(); },
      () => { loader.dismiss(); }
    );
  }

  deleteStaffingResponse(staffingResponse) {

    let loader = this.loadingController.create({
      content: 'Deleting Response...'
    });

    loader.present();

    this.staffingResponseApi.deleteStaffingResponse(staffingResponse).subscribe(
      response => {
        this.respUtility.showSuccess("Deleted Response");
        this.navCtrl.pop();
      },
      error => { this.respUtility.showFailure(error); loader.dismiss(); },
      () => { loader.dismiss(); }
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

  makePayment(staffingResponse) {
    let payment = {
      staffing_request_id: staffingResponse.staffing_request_id,
      user_id: staffingResponse.user_id,
      staffing_response_id: staffingResponse.id,
      notes: "Thank you for your service."
    }
    this.navCtrl.push(PaymentForm, payment);
  }

  rate(staffingResponse) {
    let rating = {
      staffing_request_id: staffingResponse.staffing_request_id,
      user_id: staffingResponse.user_id,
      staffing_response_id: staffingResponse.id,
      comments: "Great Work."
    }
    this.navCtrl.push(RatingForm, rating);
  }

  presentActionSheet(staffingResponse) {
    let buttons = [];

    if (staffingResponse.can_manage == true) {
      console.log("can manage staffingResponse");
      buttons = buttons.concat([
        {
          text: 'Show Request',
          icon: !this.platform.is('ios') ? 'folder' : null,
          handler: () => {
            console.log('Show Request clicked');
            this.showRequest(staffingResponse);
          }
        }

      ]);

      if (this.staffingResponse.response_status != "Accepted") {

        buttons = buttons.concat([
          {
            text: 'Accept Response',
            icon: !this.platform.is('ios') ? 'checkmark' : null,
            handler: () => {
              console.log('Accept clicked');
              this.acceptResponse(staffingResponse);
            }
          }
        ]);
      } else {
        buttons = buttons.concat([
          {
            text: 'Add Start / End Codes',
            icon: !this.platform.is('ios') ? 'create' : null,
            handler: () => {
              console.log('Edit clicked');
              this.editStaffingResponse(staffingResponse);
            }
          }
        ]);
      }

      if (this.staffingResponse.response_status != "Rejected") {

        buttons = buttons.concat([
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

      if (this.staffingResponse.payment_status == "Paid") {
        buttons = buttons.concat([
          {
            text: 'View Payment',
            icon: !this.platform.is('ios') ? 'cash' : null,
            handler: () => {
              console.log('View Payment clicked');
              this.navCtrl.push(PaymentDetails, this.staffingResponse.payment)
            }
          }
        ]);
      }

      if (this.staffingResponse.rated == true) {
        buttons = buttons.concat([
          {
            text: 'View Rating',
            icon: !this.platform.is('ios') ? 'star' : null,
            handler: () => {
              console.log('View Rating clicked');
              this.navCtrl.push(RatingDetails, this.staffingResponse.rating);
            }
          }
        ]);
      }

    } else {

      if (this.staffingResponse.response_status == "Accepted") {
        if (this.staffingResponse.payment_status !== "Paid") {
          buttons = buttons.concat([
            {
              text: 'Make Payment',
              icon: !this.platform.is('ios') ? 'cash' : null,
              handler: () => {
                console.log('Make Payment clicked');
                this.makePayment(staffingResponse);
              }
            }
          ]);
        } else if (this.staffingResponse.payment_status == "Paid") {
          buttons = buttons.concat([
            {
              text: 'View Payment',
              icon: !this.platform.is('ios') ? 'cash' : null,
              handler: () => {
                console.log('View Payment clicked');
                this.navCtrl.push(PaymentDetails, this.staffingResponse.payment)
              }
            }
          ]);
        }

        if (this.staffingResponse.rated != true) {
          buttons = buttons.concat([
            {
              text: 'Rate',
              icon: !this.platform.is('ios') ? 'star' : null,
              handler: () => {
                console.log('Rate clicked');
                this.rate(staffingResponse);
              }
            }
          ]);
        } else {
          buttons = buttons.concat([
            {
              text: 'View Rating',
              icon: !this.platform.is('ios') ? 'star' : null,
              handler: () => {
                console.log('View Rating clicked');
                this.navCtrl.push(RatingDetails, this.staffingResponse.rating);
              }
            }
          ]);
        }
      }
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
