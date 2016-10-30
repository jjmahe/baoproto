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
	private extractData(res: Response) {
		let baoFilter = function(resto: any){
		 	var villeOK: boolean = true ;
		 	var noteOK: boolean = true ;
		 	var poidsNote : number ;	
			
			var getWeight = function(picto: string) {
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
							'5CH' : 14 };
			   	return poidsDuPicto[picto] ;
			  }

		 	if(this.filtreparvilles && this.ville != ''){
		 		villeOK = (resto.bao_ville == this.ville) ;
		 	}
		 	if(this.filtreparnotes) {
		 		noteOK = false ;
		 		poidsNote = getWeight(resto.bao_picto) ;
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
		  }

	let baoSortbyNoteDesc = function(a:any,b:any){
		return(baoSortbyNote(b,a)) ;
	}

	let baoSortbyNote = function(a:any,b:any){
		  	var comp: number = 0 ;
			var getWeight = function(picto: string) {
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
							'5CH' : 14 };
			   	return poidsDuPicto[picto] ;
			 }
		  	comp = getWeight(a.bao_picto) - getWeight(b.bao_picto) ;
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
		  var earth_radius = 6378.137;   // Terre = sphère de 6378km de rayon
		  var rlo1 = radians(lng1);
		  var rla1 = radians(lat1);
		  var rlo2 = radians(lng2);
		  var rla2 = radians(lat2);
		  var dlo = (rlo2 - rlo1) / 2;
		  var dla = (rla2 - rla1) / 2;
		  var a = (Math.sin(dla) * Math.sin(dla)) + Math.cos(rla1) * Math.cos(rla2) * (Math.sin(dlo) * Math.sin(dlo
		));
		  var d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		  /*
		  console.log('lat1 ' + lat1 + ' lng1 ' + lng1 + ' lat2 ' + lat2 + ' lng2 ' + lng2 + ' dist ' + (earth_radius * d)) ;
		  */
		  return Math.round((earth_radius * d)*1000)/1000;
	};

	let radians = function(degrees) {
	  		return (degrees * Math.PI / 180);
	} ;
		let data = res.json();
		let restos = <any>[] ;
      	for (var resto of data){
      		var coords = resto.bao_longlat.split(',');
      		resto.bao_latitude = coords[0] ;
      		resto.bao_longitude = coords[1] ;
      		resto.bao_distance = get_distance_km(this.latitude,
										      			this.longitude,
										      			resto.bao_latitude,
										      			resto.bao_longitude);
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

