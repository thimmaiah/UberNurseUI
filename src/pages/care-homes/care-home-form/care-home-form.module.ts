import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareHomeForm } from './care-home-form';

@NgModule({
  declarations: [
    CareHomeForm,
  ],
  imports: [
    IonicPageModule.forChild(CareHomeForm),
  ],
  exports: [
    CareHomeForm,
  ]
})
export class CareHomeFormModule {}
