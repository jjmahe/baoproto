import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

/*
  Generated class for the LegendePicto page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-legende-picto',
  templateUrl: 'legende-picto.html'
})
export class LegendePictoPage {
	thePicto: string;
  constructor(public params: NavParams) {
  	var legendDuPicto = {
		'4Z' : 'Un scandale!',
		'3Z' : 'À éviter' ,
		'2Z' : 'Mauvais',
		'1Z' : 'Médiocre' ,
		'AR' : 'À Revoir' ,
		'0CD' : 'Moyen' ,
		'1CH' : 'Moyen',
		'1CD' : 'Moyen plus',
		'2CH' : 'Bon' ,
		'2CD' : 'Très bon' ,
		'3CH' : 'Raffiné',
		'3CD' : 'Très raffiné' ,
		'4CH' : 'Grand chef' ,
		'4CD' : 'Très grand chef' ,
		'5CH' : 'Exceptionnel'
	};
  	this.thePicto = legendDuPicto[params.get('thePicto')];
  }

}
