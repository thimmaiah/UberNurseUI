import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffingResponse } from './staffing-response';
import { StaffingResponseDetails } from './staffing-response-details';
import { StaffingResponseForm } from './staffing-response-form';

@NgModule({
  declarations: [
    StaffingResponse,
    StaffingResponseDetails,
    StaffingResponseForm
  ],
  imports: [
    IonicPageModule.forChild(StaffingResponse),
    IonicPageModule.forChild(StaffingResponseDetails),
    IonicPageModule.forChild(StaffingResponseForm)
  ],
  exports: [
    StaffingResponse,
    StaffingResponseDetails,
    StaffingResponseForm
  ]
})
export class StaffingResponsessModule {}
