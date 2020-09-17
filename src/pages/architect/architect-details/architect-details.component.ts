import { Service } from "./../../../app/services/service";
import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  LoadingController,
  NavParams,
  Platform,
} from "@ionic/angular";
import { ProjectDetailsComponent } from "./project-details/project-details.component";
import { EmailModalComponent } from "./../../ads/ad-details/email-modal/email-modal.component";

@Component({
  selector: 'app-architect-details',
  templateUrl: './architect-details.component.html',
  styleUrls: ['./architect-details.component.scss'],
})
export class ArchitectDetailsComponent implements OnInit {
  architects: any;
  user: any;
  cover: any;
  profile: any;
  project: any;
  description: any;
  expertise: any;
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private service: Service,
    private loadingCtrl: LoadingController,
    private navParams: NavParams,
    platform: Platform
  ) {
    platform.backButton.subscribe(() => {
      this.dismiss();
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.user = this.navParams.get("id");
    this.profile = this.navParams.get("image");
    this.description = this.navParams.get("description");
    this.expertise = this.navParams.get("expertise");
    this.getProjects(this.user);
}

  async getProjects(id) {
    var loading = await this.loadingCtrl.create({
      message: "Fetching Projects...",
    });
    loading.present();
    this.service.getArchitectProjects(id).subscribe(
      (res) => {
        loading.dismiss();
        console.log(res);
        this.architects = res[0];
        if (this.architects.projects)
          this.project = this.architects.projects;
        if (this.project.length > 0) {
          this.cover = this.project[0].images[0].fileLocation;
        }
      },
      (err) => {
        loading.dismiss();
        console.error("Error while getting projects", err);
      }
    );
  }

  async openDetails(images) {
    let projectDetails = await this.modalCtrl.create({
      component: ProjectDetailsComponent,
      cssClass: "asasa-modal",
      componentProps: {
        projectImages: images,
      }
    });

    projectDetails.present();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async sendEmail() {
    let emailModal = await this.modalCtrl.create({
      component: EmailModalComponent,
      cssClass: "asasa-modal",
      componentProps: {
        architectDetail: this.architects
      }
    });

    emailModal.present();
  }
}
