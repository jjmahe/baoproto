import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LaunchNavigator } from 'ionic-native' ;

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
	public resto: any;
  constructor(private navCtrl: NavController, private params: NavParams) {
  	this.resto = params.data ;
  }
 
 navigateToResto(LatLong){
    LaunchNavigator.navigate(LatLong)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

}
