import { Component } from '@angular/core';
import { NavController, ViewController , NavParams } from 'ionic-angular';
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
  public goToDetail = function(){
      this.vc.dismiss().then(
      		() => this.parentNav.push(Detail,this.resto)
      );
  } ;
}

