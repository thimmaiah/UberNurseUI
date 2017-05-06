import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RatingApi } from '../../providers/rating-api';
import { ResponseUtility } from '../../providers/response-utility';
import { RatingDetails } from '../rating/rating-details'



@IonicPage()
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class Rating {

  ratings = [];
  rating: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public ratingApi: RatingApi,
    public respUtility: ResponseUtility) {
  }



  ionViewWillEnter() {
    console.log('ionViewWillEnter Ratingss');

    let loader = this.loadingController.create({
      content: 'Loading Ratings...'
    });

    loader.present();


    this.ratingApi.getRatings().subscribe(
      ratings => {
        this.ratings = ratings;
        console.log("Loaded ratings");
      },
      error => { this.respUtility.showFailure(error); loader.dismiss(); },
      () => { loader.dismiss(); }
    );

  }

  getRatingDetails(rating) {
    let loader = this.loadingController.create({
      content: 'Loading Ratings...'
    });

    loader.present()
    this.ratingApi.getRatingDetails(rating.id).subscribe(
      rating => {
        this.rating = rating;
        console.log("got rating " + rating);
        this.navCtrl.push(RatingDetails, rating);
      },
      error => { this.respUtility.showFailure(error); loader.dismiss(); },
      () => { loader.dismiss(); }
    );

  }
}
