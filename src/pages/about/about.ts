import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	public frac12 : string = '&frac12;' ;
  constructor(public navCtrl: NavController) {

  }

}
