import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Config } from '../../providers/config';
import { Angular2TokenService } from 'angular2-token';
import { UserDocApi } from '../../providers/user-doc-api';
import { ResponseUtility } from '../../providers/response-utility';

@Component({
  selector: 'page-user-doc',
  templateUrl: 'user-doc.html',
})
export class UserDoc {

  document: any;
  doc_url = null;
  current_user: {};
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private config: Config,
    private tokenService: Angular2TokenService,
    private userDocApi: UserDocApi,
    private loadingController: LoadingController,
    private respUtility: ResponseUtility) {
    this.document = this.navParams.data;
    this.doc_url = config.props["API_URL"] + this.document.doc;

    this.current_user = tokenService.currentUserData;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDoc');
  }

  markVerified(document) {
    document.verified = true;
    this.save(document);
  }

  markRejected(document) {
    document.verified = false;
    this.save(document);
  }

  save(document) {
    let loader = this.loadingController.create({
      content: 'Saving ...'
    });
    this.userDocApi.updateUserDoc(document).subscribe(
      staffingRequest => {
        this.respUtility.showSuccess('Action Successfull.');
        this.navCtrl.pop();
      },
      error => {
        this.respUtility.showFailure(error);
        loader.dismiss();
      },
      () => { loader.dismiss(); }
    );
  }

}
