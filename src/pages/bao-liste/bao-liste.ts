import { Component, ViewChild } from '@angular/core';
import { NavController, Platform,PopoverController, LoadingController , Loading , Content } from 'ionic-angular';
import { CallNumber,InAppBrowser,LaunchNavigator,Geolocation, Shake} from 'ionic-native';  
import { Restolist } from '../../providers/restolist';
import { Detail } from '../detail/detail' ;
import { Options } from '../../providers/options';
import { GoogleAnalyticsService } from '../../providers/google-analytics-service';
import { LegendePictoPage } from '../legende-picto/legende-picto';
import { Observable } from 'rxjs/Observable';

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
  @ViewChild(Content) content: Content;

	public restos: any[] ;
	public errorMessage : any ;
  public frac12 : string = '&frac12;' ;
  private nav : NavController ;
  private spinner: Loading; 
  public watcher: any;
  public trackByFn: (x: number, y: any )=>number = function( index, item ) {
      /* console.log( "TrackBy:", item.bao_restaurant, "at index", index );*/
      return( item.id );
    }  ;


  constructor(private navCtrl: NavController, 
  			private restosService: Restolist,
        private  options: Options,
        private platform: Platform ,
        private poCtrl: PopoverController,
        public loadingCtrl: LoadingController,
        public GAService: GoogleAnalyticsService ) {
    this.nav = navCtrl ;
  }

  ionViewWillEnter(){
    this.GAService.trackView('Liste');
    if( this.options.page != 'details' ){
      this.content.scrollTo(0, 0) ;
      this.spinner = this.loadingCtrl.create({
        content: 'Bon Appétit...'
      }) ;
      this.spinner.present() ;
      this.restos = [] ;
    	this.restosService.getRestos()
    		.subscribe(
    			data => {this.restos = data;
                  this.spinner.dismiss();
                  this.watcher = Shake.startWatch(60).subscribe(() => {
                    let index = Math.round(Math.random()*(this.restos.length-1));
                    this.goToDetail(this.restos[index]);
                  });
                },
    			error => this.errorMessage = <any>error)
         ;
     }
     else{
       this.watcher = Shake.startWatch(60).subscribe(() => {
                    let index = Math.round(Math.random()*(this.restos.length-1));
                    this.goToDetail(this.restos[index]);
                  });
     }
     this.options.page = 'liste' ;
  }

  ionViewWillLeave(){
    if(this.watcher){
      this.watcher.unsubscribe();
    }
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
    this.spinner = this.loadingCtrl.create({
      content: 'Respirez...'
    }) ;
    this.spinner.present();
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
        data => {this.restos = data;this.spinner.dismiss();},
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
