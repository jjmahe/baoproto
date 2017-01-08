import { Component , ViewChild, ElementRef} from '@angular/core';
import { NavController , PopoverController , LoadingController , Loading } from 'ionic-angular';
import { Options } from '../../providers/options'
import { Restolist } from '../../providers/restolist'
import { Info } from '../info/info'
import { LegendePage } from '../legende/legende'
import { GoogleAnalyticsService } from '../../providers/google-analytics-service';


 
declare var google;

/*
  Generated class for the MapallPagePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bao-carte',
  templateUrl: 'bao-carte.html'
})

export class BaoCarte {


  @ViewChild('map') mapElement: ElementRef;
  private map: any;
  private options: Options ;
  private restos: any[] ;
  private errorMessage : any ;
  private markers : any[];
  public spinner : Loading ;
  
  /*private infoWindow: any ;*/
  /* private nav : NavController ;*/

  constructor(public navCtrl: NavController, 
    private optionsService: Options, 
    private restosService: Restolist,
    private poCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public GAService: GoogleAnalyticsService ) {
     this.options = optionsService ;
     /*this.nav = navCtrl ;*/
     /*this.infoWindow = new google.maps.InfoWindow();*/
  }
 
  ionViewWillEnter(){
    this.GAService.trackView('Carte');
    if( this.options.page != 'details' ){
            this.spinner = this.loadingCtrl.create({
        content: 'Prenons de la hauteur...'
      }) ;
      this.spinner.present() ;
      this.markers = new Array ;
      this.restosService.getRestos()
        .subscribe(
          data => {this.restos = data;
                  this.loadMap();},
          error => this.errorMessage = <any>error ) ;  
    }
    this.options.page = 'carte' ;
  }
 
  loadMap(){
 
    let latLng = new google.maps.LatLng(this.options.latitude, this.options.longitude);
 
    let mapOptions = {
      center: latLng,
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
    this.addMarkers();
    this.spinner.dismiss();
 
  }

  addMarkers(){

    for ( var i=0;i < this.restos.length;i++ ) {
        let marker = new google.maps.Marker({
                        /*iw: this.infoWindow ,*/
                        scope: {resto: this.restos[i],
                                nav: this.navCtrl} ,
                        map: this.map,
                        icon: {
                          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                          scale: 5,
                          fillColor: this.restos[i].bao_pictocolor,
                          fillOpacity: 0.7,
                          strokeColor: 'grey',
                          strokeWeight: 1
                        },
                        title: this.restos[i].bao_restaurant ,
                        position: new google.maps.LatLng(this.restos[i].bao_latitude,this.restos[i].bao_longitude)
                      });
        marker.addListener('click', (event) => {
                this.openPopover(event, marker.scope );
          });
    }
    
  }

 openPopover(myev, scope ){

    let popover = this.poCtrl.create(Info,scope,{cssClass: 'info-popover'});
    
    popover.present(myev) ;
  }

  openLegende(event){
    let popover = this.poCtrl.create(LegendePage,{},{cssClass: 'legende-popover'});
    popover.present({
      ev: event
    });
  }
  
}
