import { Component } from '@angular/core';
import { Platform, NavController , LoadingController, Loading} from 'ionic-angular';
import { InAppBrowser } from 'ionic-native' ;
import { Options } from '../../providers/options'
import { Villes } from '../../providers/villes'
import { GoogleAnalyticsService } from '../../providers/google-analytics-service'

/*
  Generated class for the BaoSettings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bao-settings',
  templateUrl: 'bao-settings.html',
  providers: [Villes]
})
export class BaoSettings {

  	public label1: string ;
	public label2: string ;
	public label3: string ;
  	public villes: any ;
    public spinner: Loading ;
 
  constructor(private navCtrl: NavController, 
              public options: Options, 
              private villesService: Villes ,
              public loadingCtrl: LoadingController,
              public platform: Platform,
              public GAService : GoogleAnalyticsService ) {
    this.loadVilles() ;
  	this.options = options ;

  	this.label1 = "&frac12; , 1 et 1&frac12; chandeliers" ;
  	this.label2 = "2 et 2&frac12; chandeliers" ;
  	this.label3 = "3 et 3&frac12; chandeliers" ;



  }
  loadVilles(){
    this.spinner = this.loadingCtrl.create({
      content: 'Bonjour...'
    });
    this.spinner.present();
    this.villesService.load()
      .then(data => {
        this.villes = data ;
        this.spinner.dismiss();
      })
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
            this.GAService.trackView("Settings Page");
        });
    this.options.page = 'settings' ;
    
  }

  goToBao(){
    var browser = new InAppBrowser("http://www.le-bouche-a-oreille.com",'_BLANK');
  }

}
