import { Component } from '@angular/core';


/*
  Generated class for the Bonus provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
	selector: 'baoBonus',
	templateUrl: './bonus.html',
	inputs:['bonus']
})
export class Bonus {
	public bonus: string ;
	public bonusLines: string[] ;
  constructor() {
    
  }
  ngOnChanges(changes){
    if(this.bonus){
    	this.bonusLines = this.bonus.replace(new RegExp("&ndash;", 'g'),"-").split("-") ;
    }
  }

}
