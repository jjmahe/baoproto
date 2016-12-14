import { Component } from '@angular/core';
import { NavController, Platform,PopoverController } from 'ionic-angular';
import { CallNumber,InAppBrowser,LaunchNavigator,Geolocation} from 'ionic-native';  
import { Restos } from '../../providers/restos';
import { Detail } from '../detail/detail' ;
import { Options } from '../../providers/options';
import { LegendePictoPage } from '../legende-picto/legende-picto'



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
  			private restosService: Restos,
        private  options: Options,
        private platform: Platform ,
        private poCtrl: PopoverController) {
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
    
    let browser = new InAppBrowser("http://"+URL,'_BLANK');
 
  }

  refreshButton(){
    if( !this.platform.is('core') ){
        Geolocation.getCurrentPosition().then((resp) => {
         // resp.coords.latitude
         // resp.coords.longitude
           this.options.latitude = resp.coords.latitude ;
           this.options.longitude = resp.coords.longitude ;
        })
    }
    else{
      this.options.latitude = 43.125370;
      this.options.longitude =  5.930296 ;
    }
    this.restosService.getRestos()
      .subscribe(
        data => this.restos = data,
        error => this.errorMessage = <any>error ) ;
  }

  navigateToResto(LatLong){
    LaunchNavigator.navigate(LatLong)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

  openLegende(event,picto){
    
    let popover = this.poCtrl.create(LegendePictoPage,{thePicto: picto},{});
    popover.present({
      ev: event
    });
  }
}
