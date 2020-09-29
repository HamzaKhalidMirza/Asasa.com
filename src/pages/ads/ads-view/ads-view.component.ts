import { Component, ViewChild, ChangeDetectorRef, OnInit } from "@angular/core";
import {
  NavController,
  ModalController, IonContent
} from "@ionic/angular";
import { Service } from "../../../app/services/service";
import { AdDetailsComponent } from "../ad-details/ad-details.component";

import { FilterService } from "../../../app/services/filterService";

@Component({
  selector: 'app-ads-view',
  templateUrl: './ads-view.component.html',
  styleUrls: ['./ads-view.component.scss'],
})
export class AdsViewComponent implements OnInit {
  @ViewChild("scrollableContent") content: IonContent;
  display: boolean = false;
  favourite: boolean = false;
  stopLoader: boolean;
  processingData: any;
  ads: any = [];
  loading: any;

  highAndLow = "lth";
  sort: any;
  lazyLoadedData: any;
  loadedAds: number = 20;

  constructor(
    public navCtrl: NavController,
    private service: Service,
    private modalCtrl: ModalController,

    public filterService: FilterService,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.processingData = this.filterService.processingData;

    this.lazyLoadedData = this.filterService.processedData;
    this.stopLoader = false;

    this.loadingLazyLoadedAds();

    this.filterService.filterAdsChange.subscribe(res => {
      this.stopLoader = false;
      this.ads = [];
      if (this.display) {
        this.content.scrollToTop();
      }
      this.lazyLoadedData = res;
      this.loadingLazyLoadedAds();
    });
    if (this.processingData) {
      this.checkFavourite();
    }
  }

  loadingLazyLoadedAds() {
    if (!this.lazyLoadedData) {
      this.service.emitAds.subscribe(res => {
        this.lazyLoadedData = res;
        this.loadingLazyLoadedAds();
      });
    }

    if (this.lazyLoadedData) {
      for (let i = 0; i < this.loadedAds; i++) {
        if (i < this.lazyLoadedData.length) {
          this.ads.push(this.lazyLoadedData[i]);
        } else break;
      }
    }
  }

  infiniteScroll() {
    var previosAdsCount = this.loadedAds;

    this.loadedAds = this.loadedAds + 20;

    if (this.loadedAds > this.lazyLoadedData.length) {
      this.stopLoader = true;
    }

    for (let i = previosAdsCount; i < this.loadedAds; i++) {
      if (i < this.lazyLoadedData.length) {
        this.ads.push(this.lazyLoadedData[i]);
      } else break;
    }
  }

  getArea(areaType, area) {
    return this.service.convertArea(areaType, area);
  }

  getDemand(demand) {
    return this.service.localeString(demand);
  }

  async openDetails(info) {
    let detailModal = await this.modalCtrl.create({
      component: AdDetailsComponent,
      cssClass: "asasa-modal",
      componentProps: {
        adDetail: info
      }
    });
    detailModal.onDidDismiss().then(data => {});
    detailModal.present();
  }

  public sortArray(e) {
    this.ads = [];
    this.loadedAds = 20;
    if (e != "htl" && e != "lth") {
      this.sort = e;
    }
    if (e != "demand" && e != "area") {
      this.highAndLow = e;
    }

    if (this.sort == "demand") {
      if (this.highAndLow == "lth") {
        this.lazyLoadedData = this.lazyLoadedData.sort(
          (a, b) => parseInt(a.demand) - parseInt(b.demand)
        );
        this.loadingLazyLoadedAds();
      } else if (this.highAndLow == "htl") {
        this.lazyLoadedData = this.lazyLoadedData.sort(
          (a, b) => parseInt(b.demand) - parseInt(a.demand)
        );
        this.loadingLazyLoadedAds();
      }
    } else if (this.sort == "area") {
      if (this.highAndLow == "lth") {
        this.lazyLoadedData.sort((a, b) => {
          return this.service.compareStrings(
            this.getArea(a.property_unit, a.land_area),
            this.getArea(b.property_unit, b.land_area),
            "isNum"
          );
        });
        this.loadingLazyLoadedAds();
      } else if (this.highAndLow == "htl") {
        this.lazyLoadedData.sort((a, b) => {
          return this.service.compareStrings(
            this.getArea(b.property_unit, b.land_area),
            this.getArea(a.property_unit, a.land_area),
            "isNum"
          );
        });

        this.loadingLazyLoadedAds();
      }
    }
  }

  public scrollToTop() {
    this.content.scrollToTop(500);
  }

  getScroll(e) {
    if (e.detail.scrollTop > 230) {
      this.display = true;
      this.change.detectChanges();
    } else if (e.detail.scrollTop < 230) {
      this.display = false;
      this.change.detectChanges();
    }
  }

  checkFavourite() {
    this.processingData.forEach((item, index) => {
      this.processingData[index]["fav"] = false;
      if (localStorage.getItem("favourites"))
        if (localStorage.getItem("favourites").length > 0) {
          if (
            localStorage.getItem("favourites").includes(
              JSON.stringify(item._id)
            )
          ) {
            this.processingData[index]["fav"] = true;
          }
        }
    });
  }
}
