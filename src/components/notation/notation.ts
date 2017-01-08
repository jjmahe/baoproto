import { Component } from '@angular/core';
import { Slides } from 'ionic-angular' ;
import { CallNumber, InAppBrowser} from 'ionic-native';  
import { GoogleAnalyticsService } from '../../providers/google-analytics-service';

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
  public slideOptions: any ;
  constructor(public GAService: GoogleAnalyticsService ) {
    this.slideOptions = {
      autoplay: 3000,
      loop: true

    }
  }

  phoneCall(phoneNumber){
/*    let allDots: string = "/\./g";*/
    var dots = new RegExp(/\./g);
    let phoneTrueNumber: string = phoneNumber.replace(dots,'');
/*    alert(phoneTrueNumber);*/
/*    Vibration.vibrate(1000);*/
    this.GAService.trackEvent('click','phone',this.resto.bao_restaurant);
  	CallNumber.callNumber( phoneTrueNumber , false) 
      .catch(()=>alert('erreur avec callnumber'));
  }

  goToSite(URL){
    this.GAService.trackEvent('click','site',this.resto.bao_restaurant);
    
    let browser = new InAppBrowser("http://"+URL,'_BLANK');
    
  }
  goToURL(URL){
    this.GAService.trackEvent('click','BAO',this.resto.bao_restaurant);
    
    let browser = new InAppBrowser(URL,'_BLANK');
    /*browser.show() ;*/
  }

}
