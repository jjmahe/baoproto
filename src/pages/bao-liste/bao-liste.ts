import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Restos } from '../../providers/restos';


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
  downArrow(clicked){
    let restoID:string = clicked ;
    console.log('clicked '+ restoID);
    document.getElementById('down'+restoID).style.display = 'none' ;
    document.getElementById('up'+restoID).style.display = 'block' ;
    document.getElementById('details'+restoID).style.display = 'block' ;
  }
  upArrow(clicked){
    let restoID:string = clicked ;
    console.log('clicked '+ restoID);
    document.getElementById('up'+restoID).style.display = 'none' ;
    document.getElementById('down'+restoID).style.display = 'block' ;    
    document.getElementById('details'+restoID).style.display = 'none' ;
  }

}
