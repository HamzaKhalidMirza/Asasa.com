import { AdDetailsComponent } from './../pages/ads/ad-details/ad-details.component';
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  Platform,
  ModalController,
  LoadingController,
  NavController,
  MenuController,
  AlertController,
} from "@ionic/angular";

import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { CodePush } from "@ionic-native/code-push/ngx";
import { Network } from "@ionic-native/network/ngx";
import { LaunchReview } from "@ionic-native/launch-review/ngx";
import { Facebook } from "@ionic-native/facebook/ngx";

import { Service } from "./services/service";
import { LoginService } from "./services/login.service";

import { LoginPage } from "../pages/login/login.page";
import { ArchitectPage } from "../pages/architect/architect.page";
import { ProjectsPage } from "../pages/projects/projects.page";
import { HomeComponentPage } from "../pages/home/home-components/home-component";
import { FavouriteAdsPage } from "../pages/favourite-ads/favourite-ads.page";
import { SellComponent } from "../pages/sell/sell.component";
import { TestimonialComponent } from "../pages/testimonial/testimonial.component";
import { EditProfileComponent } from "../pages/edit-profile/edit-profile.component";
import { EmailModalComponent } from "./../pages/ads/ad-details/email-modal/email-modal.component";
import { LocateUsComponent } from "./../pages/locate-us/locate-us.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  loggedIn: boolean = false;
  loginCheck: boolean = true;
  userData: any;
  rootPage: any;
  loggedInText = "Signed In Successfully!";
  loggedOutText = "Signed Out Successfully!";
  favouriteCount: any;
  myInput: any;
  connectionStatus: boolean;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    fb: Facebook,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public router: Router,
    private service: Service,
    private loginService: LoginService,
    private menu: MenuController,
    private codePush: CodePush,
    private network: Network,
    private launchReview: LaunchReview,
    private alertCtrl: AlertController
  ) {
    platform.ready().then(() => {
      // this.rootPage = HomeComponentPage;

      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      splashScreen.hide();

      this.loginService.userChange.subscribe((value) => {
        this.userData = value;
        this.loginCheck = false;
        this.loggedIn = true;
      });

      //Checking internet connectivity...

      if (this.network.type == "none") {
        this.connectionStatus = false;
        this.service.connection.next(false);
      }
      if (this.network.type != "none") {
        this.connectionStatus = true;
      }

      this.network.onDisconnect().subscribe(() => {
        this.service.connection.next(false);
        this.connectionStatus = false;
        this.service.toastError("No Internet!");
      });

      // // stop disconnect watch
      // // disconnectSubscription.unsubscribe();

      // watch network for a connection
      this.network.onConnect().subscribe(() => {
        if (!this.connectionStatus) {
          this.service.toastError("Reconnecting...");
          this.service.connection.next(true);
          location.reload();
        }

        // We just got a connection but we need to wait briefly
        // before we determine the connection type. Might need to wait.
        // prior to doing any api requests as well.
      });

      // stop connect watch
      // connectSubscription.unsubscribe();

      if (platform.is("cordova")) {
        console.log("platform", platform);

        var count = 0;
        if (!localStorage.getItem("count")) {
          localStorage.setItem("count", JSON.stringify(count));
        } else if (localStorage.getItem("count")) {
          var item = JSON.parse(localStorage.getItem("count"));
          item++;
          localStorage.setItem("count", JSON.stringify(item));
        }
        var counted = JSON.parse(localStorage.getItem("count"));
        if (counted == 8) {
          this.rateUsActionSheet();
        }

        this.codePush.sync().subscribe((syncStatus) => {
          console.log("sync", syncStatus);
        });
        this.codePush.notifyApplicationReady().then((res) => {
          console.log("notifyApplicationReady", res);
        });
        const downloadProgress = (progress) => {
          console.log(
            `Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`
          );
        };
        this.codePush.sync({}, downloadProgress).subscribe((syncStatus) => {
          console.log("downloadProgess", syncStatus);
        });

        fb.logEvent("EVENT_NAME_CONTACT");
        fb.logEvent("FBSDKAppEventNameSubmitApplication");
        fb.logEvent("EVENT_NAME_SCHEDULE");
        fb.logEvent("EVENT_NAME_ADDED_PAYMENT_INFO");
        fb.logEvent("EVENT_NAME_COMPLETED_TUTORIAL");
        fb.logEvent("EVENT_NAME_COMPLETED_REGISTRATION");
        fb.logEvent("EVENT_NAME_ADDED_TO_CART");
        fb.logEvent("EVENT_NAME_ADDED_TO_WISHLIST");
        fb.logEvent("EVENT_NAME_VIEWED_CONTENT");
        fb.logEvent("EVENT_NAME_ACHIEVED_LEVEL");
      }

      this.menu.swipeGesture(false);

      if (localStorage.getItem("user")) {
        this.loginCheck = false;
        this.loggedIn = true;
        this.userData = JSON.parse(localStorage.getItem("user"));
        this.service.favourites = localStorage.getItem("favourites").length;

        this.loginService.userData = this.userData;
      }
    });
  }

  ngOnInit() {}

  async rateUsActionSheet() {
    const prompt = await this.alertCtrl.create({
      header: "Rate us!",
      message: "Do you like using ASASA.",

      buttons: [
        {
          text: "Later",
          handler: () => {
            console.log("remind me later called");
            var count = 0;
            localStorage.setItem("count", JSON.stringify(count));
          },
        },
        {
          text: "Rate now",
          handler: () => {
            this.rateUs();
          },
        },
      ],
    });
    prompt.present();
  }

  rateUs() {
    this.launchReview.launch().then(() => {
      console.log("launch");
    });

    if (this.launchReview.isRatingSupported()) {
      this.launchReview
        .rating()
        .toPromise()
        .then(() => console.log("Successfully launched rating dialog"));
    }
  }
  async openSellForm() {
    let sell = await this.modalCtrl.create({
      component: SellComponent, 
      cssClass: "asasa-modal",
    });
    sell.present();
  }

  async locateUs() {
    let locateUs = await this.modalCtrl.create({
      component: LocateUsComponent, 
      cssClass: "asasa-modal",
    });
    locateUs.present();
  }

  openFavourites() {
    this.router.navigateByUrl('/favourite-ads');
  }
  async openTestimonial() {
    let testimonial = await this.modalCtrl.create({
      component: TestimonialComponent, 
      cssClass: "asasa-modal",
    });

    testimonial.present();
  }

  async contactUs() {
    let contactUs = await this.modalCtrl.create({
      component: EmailModalComponent,
      cssClass: "asasa-modal",
      componentProps: {
        contact: true,
      }
    });

    contactUs.present();
  }

  architect() {
    this.router.navigateByUrl('/architect');
  }

  projects() {
    this.router.navigateByUrl('/projects');
  }

  public logout() {
    this.userData = null;
    this.loginService.userData = null;
    localStorage.removeItem("user");
    localStorage.removeItem("favourites");
    localStorage.removeItem("loginData");
    this.loggedIn = false;
  }

  async login() {
    let signIn = await this.modalCtrl.create({
      component: LoginPage,
      cssClass: "asasa-modal",
    });

    signIn.present();
  }

  async editProfile() {
    let edit = await this.modalCtrl.create({
      component: EditProfileComponent,
      cssClass: "asasa-modal",
    });

    edit.present();
  }

  onCancel() {
    console.log('Hello');
    this.service.getAdByRefId(this.myInput).subscribe(
      (res) => {
        this.openDetails(res.property);
      },
      (err) => {
        this.service.toast(err.error.message);
      }
    );
  }

  async openDetails(info) {
    let detailModal = await this.modalCtrl.create({
      component: AdDetailsComponent,
      cssClass: "asasa-modal",
      componentProps: {
        adDetails: info,
      }
    });
    detailModal.onDidDismiss().then((data) => {});
    detailModal.present();
  }
}
