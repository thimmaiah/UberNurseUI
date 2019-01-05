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
import { AngularTokenService } from 'angular-token';
import * as moment from 'moment';


@Component({
  selector: 'page-shift-details',
  templateUrl: 'shift-details.html',
})
export class ShiftDetails {

  shift: any;
  show_start_code = false;
  show_end_code = false;
  current_user: {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private tokenService: AngularTokenService,
    public shiftApi: ShiftApi,
    public loadingController: LoadingController,
    public respUtility: ResponseUtility) {

    if(this.navParams.data["shiftId"] != null) {
      this.getShiftDetails(this.navParams.data["shiftId"]);
    } else {
      this.shift = this.navParams.data;
    }

    this.current_user = tokenService.currentUserData;
    
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShiftsDetails');
    this.respUtility.trackView("ShiftDetails");
  }

  editShift(shift) {
    this.respUtility.trackEvent("Shift", "Edit", "click");
    this.navCtrl.push(ShiftForm, shift);
  }

  acceptResponse(shift) {
    this.respUtility.trackEvent("Shift", "Accept", "click");
    shift.accepted = true;
    shift.response_status = "Accepted"
    this.updateResponse(shift);
  }
  
  rejectResponse(shift) {
    this.respUtility.trackEvent("Shift", "Reject", "click");
    shift.accepted = false;
    shift.response_status = "Rejected"
    this.updateResponse(shift);
  }

  set_end_code() {
    this.respUtility.trackEvent("Shift", "EndCode", "click");
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

  getShiftDetails(shiftId) {

    let loader = this.loadingController.create({
      content: 'Loading Shift...'
    });

    loader.present();

    this.shiftApi.getShiftDetails(shiftId).subscribe(
      shift => {
        this.respUtility.showSuccess('Shift Loaded');
        this.shift = shift;
      },
      error => { this.respUtility.showFailure(error); loader.dismiss(); },
      () => { loader.dismiss(); }
    );
  }

  deleteShift(shift) {

    this.respUtility.trackEvent("Shift", "Delete", "click");
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
    this.respUtility.trackEvent("Shift", "ShowRequest", "click");
    let staffingRequest = {}
    staffingRequest["id"] = shift["staffing_request_id"];
    this.navCtrl.push(StaffingRequestDetails, staffingRequest);
  }

  viewPayment(shift) {
    this.respUtility.trackEvent("Shift", "ViewPayment", "click");
    console.log('View Payment clicked');
    this.navCtrl.push(PaymentDetails, this.shift.payment);
  }


  rate_care_giver(shift) {
    this.respUtility.trackEvent("Shift", "RateCareGiver", "click");
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
    this.respUtility.trackEvent("Shift", "RateCareHome", "click");
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
    this.respUtility.trackEvent("Shift", "ViewRating", "click");
    console.log('View Rating clicked');
    this.navCtrl.push(Rating, { "ratings": shift.ratings, "load_ratings": false });
  }

}
