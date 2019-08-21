import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ContactForm } from '../contact/contact-form';
import { ContactApi } from '../../providers/contact-api';
import { ResponseUtility } from '../../providers/response-utility';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'page-contact-details',
  templateUrl: 'contact-details.html',
})
export class ContactDetails {

  contact: any;
  current_user = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public contactApi: ContactApi,
    public loadingController: LoadingController, 
    public respUtility: ResponseUtility,
    public tokenService: AngularTokenService) {
    
    this.contact = this.navParams.data;
    this.current_user = tokenService.currentUserData;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactDetails');
    this.respUtility.trackView("ContactDetails");
  }

  editContact(contact) {
    this.respUtility.trackEvent("Contact", "Edit", "click");
    this.navCtrl.push(ContactForm, contact);
  }

  deleteContact(contact) {
    this.respUtility.trackEvent("Contact", "Delete", "click");
    let loader = this.loadingController.create({
      content: 'Deleting ...'
    });

    loader.present();

    this.contactApi.deleteContact(contact).subscribe(
      response => {
        this.respUtility.showSuccess("Deleted Contacts");
        this.navCtrl.pop();
      },
      error => { this.respUtility.showFailure(error); loader.dismiss();},
      () => { loader.dismiss(); }
    );
  }

  confirmDelete(contact) {
    this.respUtility.confirmDelete(this.deleteContact.bind(this), contact);      
  }
}
