import { Component } from '@angular/core';
import { InAppBrowser } from 'ionic-native'
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	public frac12 : string = '&frac12;' ;
  constructor(public navCtrl: NavController) {

  }
  goToBao(){
    let browser = new InAppBrowser('http://www.le-bouche-a-oreille.com','_system');
    browser.show() ;
  }

}
