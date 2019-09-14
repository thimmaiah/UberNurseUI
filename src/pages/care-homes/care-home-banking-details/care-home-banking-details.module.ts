import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareHomeBankingDetails } from './care-home-banking-details';

@NgModule({
  declarations: [
    CareHomeBankingDetails,
  ],
  imports: [
    IonicPageModule.forChild(CareHomeBankingDetails),
  ],
  exports: [
    CareHomeBankingDetails,
  ]
})
export class CareHomeBankingDetailsModule {}
