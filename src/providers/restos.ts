import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Options } from './options';

/*
  Generated class for the Restos provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Restos {
	private restosUrl = 'http://www.le-bouche-a-oreille.com/wp-json/IDE_BAO/v1/restos';  // URL to web API
	private options: Options ;

	ville : string ;
	filtreparvilles : boolean ;
	filtreparnotes : boolean ;
	picto0 : boolean ;
	picto1CH : boolean ;
	picto2CH : boolean ;
	picto3CH : boolean ;
	picto4CH : boolean ;
	tri: string ;
	ordre: string ;
	latitude: number;
	longitude: number;

	constructor(private http: Http, public optionsService: Options) {
		this.options = optionsService ;
	}
	getRestos (): Observable<any[]> {
		return this.http.get(this.restosUrl)
		                .map(this.extractData,this.options)
		                .catch(this.handleError);
	}
	/* select data based on filters in settings */
	private extractData(res: Response) {
		let baoFilter = function(resto: any){
		 	var villeOK: boolean = true ;
		 	var noteOK: boolean = true ;
		 	var poidsNote : number ;	
			
		 	if(this.filtreparvilles && this.ville != ''){
		 		villeOK = (resto.bao_ville == this.ville) ;
		 	}
		 	if(this.filtreparnotes) {
		 		noteOK = false ;
		 		poidsNote = resto.bao_pictoweight ;
				if( this.picto0) {
					noteOK = noteOK ? noteOK : (poidsNote < 4) ; 
				}
				if( this.picto1CH ) {
					noteOK = noteOK ? noteOK : (poidsNote > 3 && poidsNote < 8) ; 
				}
				if( this.picto2CH ) {
					noteOK = noteOK ? noteOK : (poidsNote > 7 && poidsNote < 10) ; 
				}
				if( this.picto3CH ) {
					noteOK = noteOK ? noteOK : (poidsNote > 9 && poidsNote < 12) ; 
				}
				if( this.picto4CH ) {
					noteOK = noteOK ? noteOK : (poidsNote > 11) ; 
				}
		 	}
		  	return ( villeOK && noteOK );
		} /* extractData */

	let baoSortbyNoteDesc = function(a:any,b:any){
		return(baoSortbyNote(b,a)) ;
	}

	let baoSortbyNote = function(a:any,b:any){
	  	var comp: number = 0 ;
		
	  	comp = a.bao_pictoweight - b.bao_pictoweight ;
	  	if(comp == 0){
		  	if( a.bao_restaurant < b.bao_restaurant){
		  		comp = -1 ;
		  	}
		  	if( a.bao_restaurant > b.bao_restaurant){
		  		comp = 1 ;
		  	} 		
	  	}
	  	return comp;
	}

	let	baoSortbyDistanceDesc = function(a:any,b:any){
		return(baoSortbyDistance(b,a));
	}

	let	baoSortbyDistance = function(a:any,b:any){
		return a.bao_distance - b.bao_distance ;
	}

	let baoSortbyAlphabetiqueDesc = function(a:any,b:any){
		return(baoSortbyAlphabetique(b,a));
	}

	let baoSortbyAlphabetique = function(a:any,b:any){
	  	var comp : number = 0 ;
	  	if( a.bao_restaurant < b.bao_restaurant){
	  		comp = -1 ;
	  	}
	  	if( a.bao_restaurant > b.bao_restaurant){
	  		comp = 1 ;
	  	}
	  	return comp ;
	}

	let get_distance_km = function (lat1:number,lng1:number,lat2:number,lng2:number) {
		/* var earth_radius = 6378.137;   // Terre = sphère de 6 371,009 km de rayon*/
		
		var rla1 = radians(lat1);
		var rla2 = radians(lat2);
		/*var rlo2 = radians(lng2);
		var rlo1 = radians(lng1);
		var dlo = (rlo2 - rlo1) / 2;
		var dla = (rla2 - rla1) / 2;
		var a = (Math.sin(dla) * Math.sin(dla)) + Math.cos(rla1) * Math.cos(rla2) * (Math.sin(dlo) * Math.sin(dlo));
		var d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		*/
		var d = Math.round(Math.acos(Math.sin(rla1)*Math.sin(rla2)+Math.cos(rla1)*Math.cos(rla2)*Math.cos(radians(lng1-lng2)))*6378137)/1000 ;
		/*
		console.log('lat1 ' + lat1 + ' lng1 ' + lng1 + ' lat2 ' + lat2 + ' lng2 ' + lng2 + ' dist ' + (earth_radius * d)) ;
		*/
		return d;
	};

	let radians = function(degrees) {
	  		return (degrees * Math.PI / 180);
	} ;

	let data = res.json();

	let restos = <any>[] ;

	var poidsDuPicto = {
		'4Z' : 0 ,
		'3Z' : 1 ,
		'2Z' : 2 ,
		'1Z' : 3 ,
		'AR' : 4 ,
		'0CD' : 5 ,
		'1CH' : 6 ,
		'1CD' : 7 ,
		'2CH' : 8 ,
		'2CD' : 9 ,
		'3CH' : 10 ,
		'3CD' : 11 ,
		'4CH' : 12 ,
		'4CD' : 13,
		'5CH' : 14 
	};
	/*var frac12 : string = '&frac12;' ;*/
	/*var chandelierSVG = '<span [inlineSVG]=\"\'assets/svg/chandelier.svg\'\"></span>' ;*/
	var htmlDuPicto = {
		'4Z' : 'assets/img/img4z.png',
		'3Z' : 'assets/img/img3z.png' ,
		'2Z' : 'assets/img/img2z.png',
		'1Z' : 'assets/img/img1z.png' ,
		'AR' : 'assets/img/imgar.png' ,
		'0CD' : 'assets/img/img0cd.png' ,
		'1CH' : 'assets/img/img1ch.png',
		'1CD' : 'assets/img/img1cd.png',
		'2CH' : 'assets/img/img2ch.png' ,
		'2CD' : 'assets/img/img2cd.png' ,
		'3CH' : 'assets/img/img3ch.png',
		'3CD' : 'assets/img/img3cd.png' ,
		'4CH' : 'assets/img/img4ch.png' ,
		'4CD' : 'assets/img/img4cd.png' ,
		'5CH' : 'assets/img/img5ch.png'
	};
	var colorDuPicto = {
		'4Z' : 'red',
		'3Z' : 'red' ,
		'2Z' : 'red',
		'1Z' : 'red' ,
		'AR' : 'orange' ,
		'0CD' : 'orange' ,
		'1CH' : 'orange',
		'1CD' : 'orange',
		'2CH' : 'yellow' ,
		'2CD' : 'yellow' ,
		'3CH' : 'green',
		'3CD' : 'green' ,
		'4CH' : 'blue' ,
		'4CD' : 'blue' ,
		'5CH' : 'blue'
	};

    for (var resto of data){
  		var coords = resto.bao_longlat.split(',');
  		resto.bao_latitude = coords[0] ;
  		resto.bao_longitude = coords[1] ;
  		resto.bao_distance = get_distance_km(this.latitude,
									      	this.longitude,
									      	resto.bao_latitude,
									      	resto.bao_longitude);
  		resto.bao_pictoweight = poidsDuPicto[resto.bao_picto];
  		resto.bao_pictohtml = htmlDuPicto[resto.bao_picto] ; 
  		resto.bao_pictocolor = colorDuPicto[resto.bao_picto];
  		/*console.log('picto ' + resto.bao_picto + ' poids '+resto.bao_pictoweight + ' html '+resto.bao_pictohtml ) ;*/

    }
      	if(this.ordre == 'asc'){
	      	if(this.tri == 'distance'){
		        restos = data.filter(baoFilter,this).sort(baoSortbyDistance) ;
		    }
	      	if(this.tri == 'note'){
		        restos = data.filter(baoFilter,this).sort(baoSortbyNote) ;
		    }
	      	if(this.tri == 'alphabetique'){
		        restos = data.filter(baoFilter,this).sort(baoSortbyAlphabetique) ;
		    }
		}
		else {
	      	if(this.tri == 'distance'){
		        restos = data.filter(baoFilter,this).sort(baoSortbyDistanceDesc) ;
		    }
	      	if(this.tri == 'note'){
		        restos = data.filter(baoFilter,this).sort(baoSortbyNoteDesc) ;
		    }
	      	if(this.tri == 'alphabetique'){
		        restos = data.filter(baoFilter,this).sort(baoSortbyAlphabetiqueDesc) ;
		    }			
		}
		return restos || { };
	}
	private handleError (error: any) {
		// In a real world app, we might use a remote logging infrastructure
		// We'd also dig deeper into the error to get a better message
		let errMsg = (error.message) ? error.message :
		  error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	}
	

  

	/* load() {
	  if (this.data) {
	    // already loaded data
	    return Promise.resolve(this.data);
	  }

	  // don't have the data yet
	  return new Promise(resolve => {
	    // We're using Angular HTTP provider to request the data,
	    // then on the response, it'll map the JSON data to a parsed JS object.
	    // Next, we process the data and resolve the promise with the new data.
	    this.http.get('http://www.artemis-iw.com/wp01/wp-json/IDE_BAO/v1/restos')
	      .map(res => res.json())
	      .subscribe(data => {
	        // we've got back the raw data, now generate the core schedule data
	        // and save the data for later reference
	        this.data = data;
	        resolve(this.data);
	      });
	  });
	}*/
}

