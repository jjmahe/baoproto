import { Component } from '@angular/core';

import { BaoSettings } from '../bao-settings/bao-settings';
import { BaoListe } from '../bao-liste/bao-liste';
import { BaoCarte } from '../bao-carte/bao-carte';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = BaoSettings;
  tab2Root: any = BaoListe;
  tab3Root: any = BaoCarte;
  tab4Root: any = AboutPage ;

  constructor() {

  }
}
