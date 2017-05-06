import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RatingForm } from '../rating/rating-form';
import { RatingApi } from '../../providers/rating-api';
import { ResponseUtility } from '../../providers/response-utility';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'page-rating-details',
  templateUrl: 'rating-details.html',
})
export class RatingDetails {

  rating: any;
  current_user = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public ratingApi: RatingApi,
    public loadingController: LoadingController, 
    public respUtility: ResponseUtility,
    public tokenService: Angular2TokenService) {
    
    this.rating = this.navParams.data;
    this.current_user = tokenService.currentUserData;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatingsDetails');
  }

  editRating(rating) {
    this.navCtrl.push(RatingForm, rating);
  }

  deleteRating(rating) {

    let loader = this.loadingController.create({
      content: 'Deleting ...'
    });

    loader.present();

    this.ratingApi.deleteRating(rating).subscribe(
      response => {
        this.respUtility.showSuccess("Deleted Ratings");
        this.navCtrl.pop();
      },
      error => { this.respUtility.showFailure(error); loader.dismiss();},
      () => { loader.dismiss(); }
    );
  }

  confirmDelete(rating) {
    this.respUtility.confirmDelete(this.deleteRating.bind(this), rating);      
  }
}
