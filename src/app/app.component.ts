import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar,Geolocation } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { Options } from '../providers/options' ;
import { GoogleAnalyticsService } from '../providers/google-analytics-service' ;


const urlBrowser = 'http://maps.google.com/maps/api/js?key=AIzaSyBc_Z6GWRSgrF0OcsgVB7Dqljbeawna75E';
const urlIos = 'http://maps.google.com/maps/api/js?key=AIzaSyDMpqcE9uRcsnyIgsxnsTG8bnwqd1RDu4k';
const urlAndroid = 'http://maps.google.com/maps/api/js?key=AIzaSyATNi30K7k6OH6ys_U3fL6852tcBSCN7Lg';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  constructor(private platform: Platform, 
              private options: Options,
              public GAService: GoogleAnalyticsService ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      if( !this.platform.is('core') ){
        Geolocation.getCurrentPosition().then((resp) => {
         // resp.coords.latitude
         // resp.coords.longitude
           options.latitude = resp.coords.latitude ;
           options.longitude = resp.coords.longitude ;
        })
      }
      this.loadScript() ;
    });
  }
   public loadScript() {
        let node = document.createElement('script');
        if(this.platform.is('core')){
          node.src = urlBrowser ;
        }
        else if (this.platform.is('ios')){
          node.src = urlIos ;          
        }
        else if (this.platform.is('android')){
          node.src = urlAndroid ;          
        }
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

}
