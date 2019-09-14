import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareHomeDetails } from './care-home-details';

@NgModule({
  declarations: [
    CareHomeDetails,
  ],
  imports: [
    IonicPageModule.forChild(CareHomeDetails),
  ],
  exports: [
    CareHomeDetails,
  ]
})
export class CareHomeDetailsModule {}
