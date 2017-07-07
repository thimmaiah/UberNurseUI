import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ShiftForm } from '../shift/shift-form';
import { PaymentForm } from '../payment/payment-form';
import { PaymentDetails } from '../payment/payment-details';
import { RatingForm } from '../rating/rating-form';
import { Rating } from '../rating/rating';
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
  show_start_code = false;
  show_end_code = false;

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

  set_end_code() {
    this.show_end_code = true;
    let controller = this;
    setTimeout(function() { 
        controller.rate_care_giver(controller.shift);
        console.log("rate_care_giver called in setTimeout");
    }, 3000);
  }

  updateResponse(shift) {

    let loader = this.loadingController.create({
      content: 'Updating Responses...'
    });

    loader.present();

    this.shiftApi.updateShift(shift).subscribe(
      shift => {
        this.respUtility.showSuccess('Shift Updated');
        this.navCtrl.popToRoot();
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
    this.respUtility.confirmDelete(this.deleteShift.bind(this), shift, "Cancel");
  }

  showRequest(shift) {
    let staffingRequest = {}
    staffingRequest["id"] = shift["staffing_request_id"];
    this.navCtrl.push(StaffingRequestDetails, staffingRequest);
  }

  viewPayment(shift) {
    console.log('View Payment clicked');
    this.navCtrl.push(PaymentDetails, this.shift.payment);
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

  rate_care_giver(shift) {
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

  rate_care_home(shift) {
    let rating = {
      staffing_request_id: shift.staffing_request_id,
      rated_entity_id: shift.care_home_id,
      rated_entity_type: "CareHome",
      care_home_id: shift.care_home_id,
      shift_id: shift.id,
      comments: "Thank you."
    }
    this.navCtrl.push(RatingForm, rating);
  }

  viewRatings(shift) {
    console.log('View Rating clicked');
    this.navCtrl.push(Rating, { "ratings": shift.ratings, "load_ratings": false });
  }

}
