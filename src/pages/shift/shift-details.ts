import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ShiftForm } from '../shift/shift-form';
import { PaymentForm } from '../payment/payment-form';
import { PaymentDetails } from '../payment/payment-details';
import { RatingForm } from '../rating/rating-form';
import { RatingDetails } from '../rating/rating-details';
import { StaffingRequestDetails } from '../staffing-request/staffing-request-details';
import { ShiftApi } from '../../providers/shift-api';
import { ResponseUtility } from '../../providers/response-utility';
import { ActionSheetController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-shift-details',
  templateUrl: 'shift-details.html',
})
export class ShiftDetails {

  shift: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform,
    public shiftApi: ShiftApi,
    public actionSheetCtrl: ActionSheetController,
    public loadingController: LoadingController,
    public respUtility: ResponseUtility) {
    this.shift = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShiftsDetails');
  }

  editShift(shift) {
    this.navCtrl.push(ShiftForm, shift);
  }

  acceptResponse(shift) {
    shift.accepted = true;
    shift.response_status = "Accepted"
    this.updateResponse(shift);
  }
  rejectResponse(shift) {
    shift.accepted = false;
    shift.response_status = "Rejected"
    this.updateResponse(shift);
  }
  updateResponse(shift) {

    let loader = this.loadingController.create({
      content: 'Updating Responses...'
    });

    loader.present();

    this.shiftApi.updateShift(shift).subscribe(
      shift => {
        this.respUtility.showSuccess('Shift Updated');
      },
      error => { this.respUtility.showFailure(error); loader.dismiss(); },
      () => { loader.dismiss(); }
    );
  }

  deleteShift(shift) {

    let loader = this.loadingController.create({
      content: 'Deleting Shift...'
    });

    loader.present();

    this.shiftApi.deleteShift(shift).subscribe(
      response => {
        this.respUtility.showSuccess("Deleted Shift");
        this.navCtrl.pop();
      },
      error => { this.respUtility.showFailure(error); loader.dismiss(); },
      () => { loader.dismiss(); }
    );
  }

  confirmDelete(shift) {
    this.respUtility.confirmDelete(this.deleteShift.bind(this), shift);
  }

  showRequest(shift) {
    let staffingRequest = {}
    staffingRequest["id"] = shift["staffing_request_id"];
    this.navCtrl.push(StaffingRequestDetails, staffingRequest);
  }

  makePayment(shift) {
    let payment = {
      staffing_request_id: shift.staffing_request_id,
      user_id: shift.user_id,
      shift_id: shift.id,
      amount: shift.price,
      pricing_audit: shift.pricing_audit,
      notes: "Thank you for your service."
    }
    this.navCtrl.push(PaymentForm, payment);
  }

  rate(shift) {
    let rating = {
      staffing_request_id: shift.staffing_request_id,
      rated_entity_id: shift.user_id,
      rated_entity_type: "User",
      care_home_id: shift.care_home_id,
      shift_id: shift.id,
      comments: "Great Work."
    }
    this.navCtrl.push(RatingForm, rating);
  }

  presentActionSheet(shift) {
    let buttons = [];

    if (shift.can_manage == true) {
      console.log("can manage shift");
      buttons = buttons.concat([
        {
          text: 'Show Request',
          icon: !this.platform.is('ios') ? 'folder' : null,
          handler: () => {
            console.log('Show Request clicked');
            this.showRequest(shift);
          }
        }

      ]);

      if (this.shift.response_status != "Accepted") {

        buttons = buttons.concat([
          {
            text: 'Accept Shift',
            icon: !this.platform.is('ios') ? 'checkmark' : null,
            handler: () => {
              console.log('Accept clicked');
              this.acceptResponse(shift);
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
              this.editShift(shift);
            }
          }
        ]);
      }

      if (this.shift.response_status != "Rejected") {

        buttons = buttons.concat([
          {
            text: 'Reject Shift',
            role: 'destructive',
            icon: !this.platform.is('ios') ? 'close-circle' : null,
            handler: () => {
              console.log('Reject clicked');
              this.rejectResponse(shift);
            }
          }
        ]);
      }

      if (this.shift.payment_status == "Paid") {
        buttons = buttons.concat([
          {
            text: 'View Payment',
            icon: !this.platform.is('ios') ? 'cash' : null,
            handler: () => {
              console.log('View Payment clicked');
              this.navCtrl.push(PaymentDetails, this.shift.payment)
            }
          }
        ]);
      }

      if (this.shift.rated == true) {
        buttons = buttons.concat([
          {
            text: 'View Rating',
            icon: !this.platform.is('ios') ? 'star' : null,
            handler: () => {
              console.log('View Rating clicked');
              this.navCtrl.push(RatingDetails, this.shift.rating);
            }
          }
        ]);
      }

    } else {

      if (this.shift.response_status == "Accepted") {
        if (this.shift.payment_status !== "Paid" && this.shift.end_code !== null) {
          buttons = buttons.concat([
            {
              text: 'Make Payment',
              icon: !this.platform.is('ios') ? 'cash' : null,
              handler: () => {
                console.log('Make Payment clicked');
                this.makePayment(shift);
              }
            }
          ]);
        } else if (this.shift.payment_status == "Paid") {
          buttons = buttons.concat([
            {
              text: 'View Payment',
              icon: !this.platform.is('ios') ? 'cash' : null,
              handler: () => {
                console.log('View Payment clicked');
                this.navCtrl.push(PaymentDetails, this.shift.payment)
              }
            }
          ]);
        }

        if (this.shift.rated != true) {
          buttons = buttons.concat([
            {
              text: 'Rate',
              icon: !this.platform.is('ios') ? 'star' : null,
              handler: () => {
                console.log('Rate clicked');
                this.rate(shift);
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
                this.navCtrl.push(RatingDetails, this.shift.rating);
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
