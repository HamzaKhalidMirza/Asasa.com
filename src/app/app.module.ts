import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageModule } from './../pages/login/login.module';
import { LocateUsComponent } from './../pages/locate-us/locate-us.component';
import { TestimonialComponent } from './../pages/testimonial/testimonial.component';
import { SellComponent } from './../pages/sell/sell.component';
import { EditProfileComponent } from './../pages/edit-profile/edit-profile.component';
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
import { FilterModalComponent } from 'src/pages/filter-modal/filter-modal.component';
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { Deeplinks } from "@ionic-native/deeplinks/ngx";

@NgModule({
  declarations: [
    AppComponent,
    FilterModalComponent,
    EditProfileComponent,
    SellComponent,
    TestimonialComponent,
    LocateUsComponent
  ],
  entryComponents: [
    FilterModalComponent,
    EditProfileComponent,
    SellComponent,
    TestimonialComponent,
    LocateUsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HomePageModule,
    LoginPageModule
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
    Deeplinks,
    SocialSharing,
    SmsRetriever,
    LaunchReview,
    Facebook,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
