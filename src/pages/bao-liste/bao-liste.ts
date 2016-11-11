import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CallNumber,InAppBrowser,LaunchNavigator} from 'ionic-native';  
import { Restos } from '../../providers/restos';
import { Detail } from '../detail/detail' ;


/*
  Generated class for the BaoListe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bao-liste',
  templateUrl: 'bao-liste.html'
})
export class BaoListe {
	public restos: any[] ;
	public errorMessage : any ;
  public frac12 : string = '&frac12;' ;
  private nav : NavController ;

  constructor(private navCtrl: NavController, 
  			private restosService: Restos) {
    this.nav = navCtrl ;
  }

  ionViewWillEnter(){
  	this.restosService.getRestos()
  		.subscribe(
  			data => this.restos = data,
  			error => this.errorMessage = <any>error ) ;
  }

  public goToDetail = function(resto){
        this.nav.push(Detail,resto);
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
