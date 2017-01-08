import { Component } from '@angular/core';


/*
  Generated class for the Section provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
	selector: 'baoSection',
	templateUrl:'./section.html',
	inputs:['sectionLabel','sectionValues']
})
export class Section {
	public sectionLabel: string;
	public sectionValues: string ;
	public values: string[] ;
  constructor() {
    
  }
  ngOnChanges(changes){
    if(this.sectionValues){
    	this.values = this.sectionValues.replace(/ *$/g,'').split('.');
    }
  }
}
