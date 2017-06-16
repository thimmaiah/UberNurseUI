import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AboutPage } from './about';
import { TermsPage } from './terms';
import { ContactPage } from './contact';

@NgModule({
  declarations: [
    AboutPage,
    ContactPage,
    TermsPage
  ],
  imports: [
    AboutPage,
    ContactPage,
    TermsPage
  ],
  exports: [
    AboutPage,
    ContactPage,
    TermsPage
  ]
})

export class StaticPageModule {}
