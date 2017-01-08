import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Options provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Options {
	public tri: string ;
  public ordre: string ;
	public filtreparnotes : boolean ;
	public picto0 : boolean ;
	public picto1CH : boolean ;
	public picto2CH : boolean ;
	public picto3CH : boolean ;
	public picto4CH : boolean ;
  public filtreparvilles: boolean ;
  public ville: string ;
  public latitude: number ;
  public longitude: number ;
  public page:string ;
  constructor() {
    this.page = 'entry' ;
  	this.tri = 'distance' ;
    this.ordre = 'asc' ;
  	this.filtreparnotes = false ;
  	this.picto0 = false ;
  	this.picto1CH = false ;
  	this.picto2CH = false ;
  	this.picto3CH = false ;
  	this.picto4CH = false ;
    this.filtreparvilles = false ;
    this.ville = '' ;
    this.latitude = 43.098226 ; // six fours les plages 43.098226, 5.828572
    this.longitude = 5.828572 ;  
  }

}

