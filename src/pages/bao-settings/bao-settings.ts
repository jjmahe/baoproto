import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Options } from '../../providers/options'
import { Villes } from '../../providers/villes'

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
 
  constructor(private navCtrl: NavController, public options: Options, private villesService: Villes ) {
    this.loadVilles() ;
  	this.options = options ;

  	this.label1 = "&frac12; , 1 et 1&frac12; chandeliers" ;
  	this.label2 = "2 et 2&frac12; chandeliers" ;
  	this.label3 = "3 et 3&frac12; chandeliers" ;



  }
  loadVilles(){
    this.villesService.load()
      .then(data => {
        this.villes = data ;
      })
  }

  ionViewDidLoad() {
    
  }

}
