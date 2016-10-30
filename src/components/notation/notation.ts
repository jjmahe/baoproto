import { Component } from '@angular/core';
import {CallNumber,InAppBrowser,LaunchNavigator} from 'ionic-native';  

/*
  Generated class for the Notation provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
	selector: 'baoNotation',
	templateUrl: './notation.html',
	inputs: ['resto']
})
export class Notation {
	public resto: any ;
  constructor() {
    
  }

  phoneCall(phoneNumber){
/*    let allDots: string = "/\./g";*/
    var dots = new RegExp(/\./g);
    let phoneTrueNumber: string = phoneNumber.replace(dots,'');
/*    alert(phoneTrueNumber);*/
/*    Vibration.vibrate(1000);*/
  	CallNumber.callNumber( phoneTrueNumber , false) 
      .catch(()=>alert('erreur avec callnumber'));
  }

  goToSite(URL){
    console.log('inAppBrowser called to '+URL);
    let browser = new InAppBrowser("http://"+URL,'_system');
    browser.show() ;
  }


  navigateToResto(LatLong){
    LaunchNavigator.navigate(LatLong)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }


}
