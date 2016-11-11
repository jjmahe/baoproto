import { Component } from '@angular/core';
import { NavController, ViewController , NavParams } from 'ionic-angular';
import {CallNumber,InAppBrowser,LaunchNavigator} from 'ionic-native';  
import { Detail } from '../detail/detail' ;

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
  constructor(private navCtrl: NavController, private vc: ViewController, private params: NavParams) {
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
    CallNumber.callNumber( phoneTrueNumber , false) 
      .catch(()=>alert('erreur avec callnumber'));
  }

  goToSite(URL){
    
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

