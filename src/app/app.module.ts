import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { InlineSVGModule } from 'ng2-inline-svg' ;
import { MyApp } from './app.component';
import { BaoSettings } from '../pages/bao-settings/bao-settings'
import { BaoListe } from '../pages/bao-liste/bao-liste'
import { BaoCarte } from '../pages/bao-carte/bao-carte'
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { Info } from '../pages/info/info';
import { Detail } from '../pages/detail/detail';
import { Options } from '../providers/options';
import { Restos } from '../providers/restos';
import { Notation } from '../components/notation/notation';
import { Note } from '../components/note/note' ;
import { Brigade } from '../components/brigade/brigade';
import { Section } from '../components/section/section' ;
import { Bonus } from '../components/bonus/bonus';

@NgModule({
  declarations: [
    MyApp,
    BaoSettings,
    BaoListe,
    BaoCarte,
    AboutPage,
    Info,
    Detail,
    TabsPage,
    Notation,
    Note,
    Brigade,
    Section,
    Bonus
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    InlineSVGModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BaoSettings,
    BaoListe,
    BaoCarte,
    AboutPage,
    TabsPage,
    Info,
    Detail
  ],
  providers: [Options,Restos]
})
export class AppModule {}
