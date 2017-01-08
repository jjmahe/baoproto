import { Component } from '@angular/core';
import { NavController, NavParams , LoadingController, Loading, PopoverController } from 'ionic-angular';
import { LaunchNavigator } from 'ionic-native' ;
import { Restos } from '../../providers/restos';
import { Options } from '../../providers/options';
import { LegendePictoPage } from '../legende-picto/legende-picto' ; 
import { GoogleAnalyticsService } from '../../providers/google-analytics-service';

/*
  Generated class for the DetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class Detail {
	public restoID: number;
  public resto: any;
  private errorMessage: any ;
  private spinner: Loading ;
  constructor(private navCtrl: NavController, 
              private params: NavParams,
              private restosService: Restos ,
              public loadingCtrl: LoadingController,
              public options: Options,
              public poCtrl: PopoverController,
              public GAService: GoogleAnalyticsService ) {

  	this.restoID = params.data.id ;


  }
 
  ionViewWillEnter(){

    this.options.page = 'details' ;
    this.spinner = this.loadingCtrl.create({
      content: 'Mettez les couverts...'
    }) ;
    this.spinner.present();
    this.restosService.getUnResto(this.restoID)
      .subscribe(
        data => {this.resto = data[0];
                 this.GAService.trackView(this.resto.bao_restaurant);
                 this.spinner.dismiss();},
        error => this.errorMessage = <any>error ) ;
  }


 navigateToResto(LatLong){
    LaunchNavigator.navigate(LatLong)
    .then(
      success => {
          console.log('Launched navigator');
          this.GAService.trackEvent('click','navigator',this.resto.bao_restaurant);
    },
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
