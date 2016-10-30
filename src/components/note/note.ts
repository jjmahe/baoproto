import { Component } from '@angular/core';

/*
  Generated class for the Note provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
	selector: 'baoNote',
	templateUrl: './note.html',
	inputs: ['noteLabel','noteMots','noteNote']
})
export class Note {
	public noteLabel: string;
	public noteMots: string ;
	public noteNote: string ;
  constructor() {
    
  }

}
