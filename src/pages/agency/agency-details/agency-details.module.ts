import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgencyDetails } from './agency-details';

@NgModule({
  declarations: [
    AgencyDetails,
   ],
  imports: [
    IonicPageModule.forChild(AgencyDetails),
   ],
  exports: [
    AgencyDetails,
  ]
})
export class AgencyDetailsModule {}
