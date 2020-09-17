import { Service } from "./../../app/services/service";
import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  LoadingController,
  Platform,
} from "@ionic/angular";
import { ArchitectDetailsComponent } from "./architect-details/architect-details.component";

@Component({
  selector: 'app-architect',
  templateUrl: './architect.page.html',
  styleUrls: ['./architect.page.scss'],
})
export class ArchitectPage implements OnInit {
  architects: any;
  searchInput: any;
  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private service: Service,
    private loadingCtrl: LoadingController,
    platform: Platform
  ) {
    platform.backButton.subscribe(() => {
      this.navCtrl.pop();
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.getArchitects();
  }
  notFound: boolean = false;
  async getArchitects() {
    var loading = await this.loadingCtrl.create({
      message: "Fetching Data...",
    });
    loading.present();
    this.service.getArchitects().subscribe(
      (res) => {
        loading.dismiss();
        this.architects = res;

        if (this.architects.length == 0) {
          this.notFound = true;
        }
      },
      (err) => {
        loading.dismiss();
        console.error("Error getting architectures", err);
      }
    );
  }

  async openDetails(id, image, des, expertise) {
    console.log(id);
    let architect = await this.modalCtrl.create({
      component: ArchitectDetailsComponent,
      cssClass: "asasa-modal",
      componentProps: {
        id: id,
        image: image,
        description: des,
        expertise: expertise,
      }
    });
    architect.onDidDismiss().then((data) => {});
    architect.present();
  }
}
