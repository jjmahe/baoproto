import { Component } from '@angular/core';

/*
  Generated class for the Brigade provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
	selector: 'baoBrigade',
	templateUrl: './brigade.html',
	inputs: ['baoChef','baoSecond','baoChefs','baoCuisine','baoPatissier','baoPatissiere'] 
})
export class Brigade {
	public baoChef: string;
	public baoSecond: string ;
	public baoChefs: string;
	public baoCuisine: string;
	public baoPatissier: string;
	public baoPatissiere: string;
  constructor() {
    
  }

}
