import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
// import {  } from "ionic-angular/navigation/nav-controller";
// import { LoginService } from "../../../../app/services/login.service";
// import { Service } from "../../../../app/services/service";
// import { SignInModalPage } from "../../sign-in-modal/sign-in";
import { ModalController } from "@ionic/angular";
import { AdDetailsComponent } from "./../../../../pages/ads/index";
import { Service } from "../../../../app/services/service";

@Component({
  selector: 'asasa-listview',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent implements OnInit {
  @Input() ads: any;
  @Input() processingData: any;
  @Input() stopLoader: boolean;
  @Output() infiniteScrollTrigger = new EventEmitter<any>();
  imgLoad: boolean = true;
  constructor(
    private service: Service,

    public modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.infiniteScrollTrigger.emit();
      infiniteScroll.complete();
    }, 700);
  }

  getDemand(demand) {
    return this.service.localeString(demand);
  }

  public priceConverter(value) {
    return this.service.priceFilter(value);
  }
  async openDetails(info) {
    let detailModal = await this.modalCtrl.create({
      component: AdDetailsComponent,
      cssClass: "asasa-modal",
      componentProps: {
        adDetail: info,
      }
    });

    detailModal.present();
  }
}
