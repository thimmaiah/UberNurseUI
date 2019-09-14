import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgencyForm } from './agency-form';

@NgModule({
  declarations: [
    AgencyForm,
   ],
  imports: [
    IonicPageModule.forChild(AgencyForm),
   ],
  exports: [
    AgencyForm,
  ]
})
export class AgencyFormModule {}
