import { Component } from '@angular/core';
import {CallNumber, InAppBrowser} from 'ionic-native';  

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
    
    let browser = new InAppBrowser("http://"+URL,'_BLANK');
    
  }
  goToURL(URL){
    
    let browser = new InAppBrowser(URL,'_BLANK');
    /*browser.show() ;*/
  }

}
