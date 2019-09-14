import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareHomes } from './care-homes';

@NgModule({
  declarations: [
    CareHomes,
  ],
  imports: [
    IonicPageModule.forChild(CareHomes),
  ],
  exports: [
    CareHomes,
  ]
})
export class CareHomesModule {}
