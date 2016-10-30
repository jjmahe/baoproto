import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar,Geolocation } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { Options } from '../providers/options' ;


const urlBrowser = 'http://maps.google.com/maps/api/js?key=AIzaSyBc_Z6GWRSgrF0OcsgVB7Dqljbeawna75E';
const urlIos = 'http://maps.google.com/maps/api/js?key=AIzaSyDMpqcE9uRcsnyIgsxnsTG8bnwqd1RDu4k';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  constructor(private platform: Platform, private options: Options) {
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
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

}
