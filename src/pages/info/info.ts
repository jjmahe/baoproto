import { Component } from '@angular/core';
import { NavController, ViewController , NavParams } from 'ionic-angular';
import {CallNumber,InAppBrowser,LaunchNavigator} from 'ionic-native';  
import { Detail } from '../detail/detail' ;
import { GoogleAnalyticsService } from '../../providers/google-analytics-service';

/*
  Generated class for the InfoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class Info {
	public resto: any ;
	private parentNav: NavController ;
  constructor(private navCtrl: NavController, 
              private vc: ViewController, 
              private params: NavParams,
              public GAservice: GoogleAnalyticsService ) {
  	this.resto = params.get('resto') ;
  	this.parentNav = params.get('nav');
  }
  public goToDetail = function(resto){
      this.vc.dismiss().then(
      		() => this.parentNav.push(Detail,resto)
      );
  } ;

  phoneCall(phoneNumber){
/*    let allDots: string = "/\./g";*/
    var dots = new RegExp(/\./g);
    let phoneTrueNumber: string = phoneNumber.replace(dots,'');
/*    alert(phoneTrueNumber);*/
/*    Vibration.vibrate(1000);*/
    this.GAservice.trackEvent('click','infoCall',this.resto.bao_restaurant);
    CallNumber.callNumber( phoneTrueNumber , false) 
      .catch(()=>alert('erreur avec callnumber'));
  }

  goToSite(URL){
    this.GAservice.trackEvent('click','infoSite',this.resto.bao_restaurant);
    
    let browser = new InAppBrowser("http://"+URL,'_BLANK');
  
  }

  navigateToResto(LatLong){
    LaunchNavigator.navigate(LatLong)
    .then(
      success => {
            this.GAservice.trackEvent('click','infoNavigate',this.resto.bao_restaurant);
            console.log('Launched navigator');
          },
      error => console.log('Error launching navigator', error)
    );
  }
  
}

