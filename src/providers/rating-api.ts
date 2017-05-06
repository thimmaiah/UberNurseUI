import { Injectable } from '@angular/core';
import { Http } from '@angular/tokenService';
import 'rxjs/add/operator/map';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class RatingApi {

  private base_url = "ratings";
  ratings = [];
  rating = {};

  constructor(private tokenService: Angular2TokenService) {
    console.log('RatingApi Provider Created');
  }

  getRatings() {
    return this.tokenService.get(`${this.base_url}.json`).map(response=>{
      this.ratings = response.json();
      return this.ratings;
    })
  }

  getRatingDetails(rating_id) {
    return this.tokenService.get(`${this.base_url}/${rating_id}.json`).map(response=>{
      this.rating = response.json();
      return this.rating;
    })
  }

  createRating(rating) {
    return this.tokenService.post(`${this.base_url}.json`, rating).map(response=>{
      this.rating = response.json();
      return this.rating;
      //return response.status;
    })
  }

  updateRating(rating) {
    console.log(`RatingApi: Updating rating`)
    console.log(rating);
    return this.tokenService.put(`${this.base_url}/${rating.id}.json`, rating).map(response=>{
      this.rating = response.json();
      return this.rating;
    })
  }

  deleteRating(rating) {
    return this.tokenService.delete(`${this.base_url}/${rating.id}.json`).map(response=>{
      return response.status;
    })
  }

}
