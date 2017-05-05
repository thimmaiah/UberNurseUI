import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Config } from '../../providers/config';


@Component({
  selector: 'page-user-doc',
  templateUrl: 'user-doc.html',
})
export class UserDoc {

  document: any;
  doc_url = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private config: Config) {
    this.document = this.navParams.data;
    this.doc_url = config.props["API_URL"] + this.document.doc;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDoc');
  }

}
