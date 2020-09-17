import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import {
  ModalController,
  NavController,
  NavParams,
  Platform,
} from "@ionic/angular";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  images: any;
  projectImages: any;
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private navParams: NavParams,
    platform: Platform
  ) {
    platform.backButton.subscribe(() => {
      this.dismiss();
    });
  }

  ngOnInit() {}

  ionViewDidLoad() {
    if (this.navParams.get("adImages")) {
      this.images = this.navParams.get("adImages");
    } else if (this.navParams.get("projectImages")) {
      this.projectImages = this.navParams.get("projectImages");
    }
  }

  ionViewCanEnter() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
