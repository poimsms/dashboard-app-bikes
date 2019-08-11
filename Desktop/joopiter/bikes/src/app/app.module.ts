import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { SignaturePadModule } from 'angular2-signaturepad';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SignatureComponent } from './components/signature/signature.component';
import { ForceUpgradeComponent } from './components/force-upgrade/force-upgrade.component';
import { RecommendUpgradeComponent } from './components/recommend-upgrade/recommend-upgrade.component';

export const firebaseConfig = {
  apiKey: "AIzaSyAmlXBSsNgsocMZ15dN8bc1D3ZD0gMAetQ",
  authDomain: "mapa-334c3.firebaseapp.com",
  databaseURL: "https://mapa-334c3.firebaseio.com",
  projectId: "mapa-334c3",
  storageBucket: "",
  messagingSenderId: "905180881415",
  appId: "1:905180881415:web:3d4928246302074a"
};

import { AppVersion } from '@ionic-native/app-version/ngx';
import { MapaComponent } from './components/mapa/mapa.component';

@NgModule({
  declarations: [
    AppComponent,
    SignatureComponent,
    ForceUpgradeComponent,
    RecommendUpgradeComponent,
    MapaComponent
  ],
  entryComponents: [
    SignatureComponent,
    ForceUpgradeComponent,
    RecommendUpgradeComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule,
    SignaturePadModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AppVersion
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
