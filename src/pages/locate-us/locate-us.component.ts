import { Component, OnInit } from "@angular/core";
import {
  ModalController,
  NavController,
  NavParams,
  Platform,
} from "@ionic/angular";

@Component({
  selector: 'app-locate-us',
  templateUrl: './locate-us.component.html',
  styleUrls: ['./locate-us.component.scss'],
})
export class LocateUsComponent implements OnInit {
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    platform: Platform
  ) {
    platform.backButton.subscribe(() => {
      this.dismiss();
    });
  }

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
