import { HomePageModule } from './../pages/home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MapService } from "./services/map.service";
import { Service } from "./services/service";
import { FilterService } from "./services/filterService";
import { LoginService } from "./services/login.service";

import { Geolocation } from "@ionic-native/geolocation/ngx";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { Network } from "@ionic-native/network/ngx";
import { Camera } from "@ionic-native/camera/ngx";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { CodePush } from "@ionic-native/code-push/ngx";
import { SmsRetriever } from "@ionic-native/sms-retriever/ngx";
import { LaunchReview } from "@ionic-native/launch-review/ngx";
import { Facebook } from "@ionic-native/facebook/ngx";

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HomePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MapService,
    Service,
    FilterService,
    LoginService,
    Geolocation,
    CallNumber,
    Network,
    Camera,
    NativeStorage,
    CodePush,
    SmsRetriever,
    LaunchReview,
    Facebook,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
