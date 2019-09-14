import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareHomeSearch } from './care-home-search';

@NgModule({
  declarations: [
    CareHomeSearch,
  ],
  imports: [
    IonicPageModule.forChild(CareHomeSearch),
  ],
  exports: [
    CareHomeSearch,
  ]
})
export class CareHomeSearchModule {}
