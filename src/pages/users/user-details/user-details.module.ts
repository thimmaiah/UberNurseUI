import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDetails } from './user-details';

@NgModule({
  declarations: [
    UserDetails,
  ],
  imports: [
    IonicPageModule.forChild(UserDetails),
  ],
  exports: [
    UserDetails,
  ]
})
export class UserDetailsModule {}
