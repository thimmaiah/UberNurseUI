import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Agency } from './agency';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    Agency,
   ],
  imports: [
    IonicPageModule.forChild(Agency),
   ],
  exports: [
    Agency,
  ]
})
export class AgencyModule {}
