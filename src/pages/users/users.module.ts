import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Users } from './users';

@NgModule({
  declarations: [
    Users,
  ],
  imports: [
    //IonicModule.forChild(Users),
  ],
  exports: [
    Users
  ]
})
export class UsersModule {}
