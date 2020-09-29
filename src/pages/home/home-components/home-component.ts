import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  NavController,
  MenuController,
  ModalController,
} from "@ionic/angular";
import { FilterService } from "../../../app/services/filterService";
import { FilterModalComponent } from "../../filter-modal/filter-modal.component";
import { Service } from "../../../app/services/service";
import { HomeSearchModalPage } from "./search/search-modal";

@Component({
  selector: "page-home-components",
  templateUrl: "home-component.html",
  styleUrls: ["home-component.scss"]
})
export class HomeComponentPage implements OnInit {

  @ViewChild("myTabs") tabRef: ElementRef;
  selectedCity: any;
  sateliteView: boolean = false;
  address: any;
  city: any;
  formattedAddress: any;
  latLng: any;
  locationData: any;
  adsData: any;
  adsFiltered: any;
  markerss = [];
  purpose: any;

  location: any;
  cityS: any;

  locations = [];

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,

    private modalCtrl: ModalController,
    private service: Service,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.filterService.filterAdsChange.subscribe((res) => {
      this.adsFiltered = res;
    });
    this.purpose = this.filterService.purpose;
    this.filterService.purposeChange.subscribe((res) => {
      this.purpose = res;
    });
    this.getAdsData();
  }

  resetLocation() {
    this.city = undefined;
    this.formattedAddress = undefined;
    this.service.searchParams = undefined;
    this.cityS = undefined;
    this.locations = [];

    this.filters = { type: "all" };

    this.filterService.filterAdsChange.next(
      this.filterService.filterByPurpose()
    );
  }

  filters: any = { type: "all" };
  async searchModal() {
    let searchModal = await this.modalCtrl.create({component: HomeSearchModalPage});
    searchModal.onDidDismiss().then(async (data: any) => {
      if (data.data) {
        console.log(data);
        if (!data.data.city) this.city = data.data.city;
        if (!data.data.location) this.formattedAddress = data.data.location;
        this.filters = data.data;

        await this.outputFilters(data.data);

        this.locationData = data.data;
        if (this.locationData.location && this.locationData.city) {
          this.city = this.locationData.city.city;
          this.formattedAddress = this.locationData.location.location;
        }
        if (this.locationData.city && !this.locationData.location) {
          this.city = this.locationData.city.city;
          this.formattedAddress = null;
        }
      }
    });
    searchModal.present();
  }

  outputAds(ad) {
    this.service.emitAds.next(ad);
  }

  outputFilters(data) {
    this.service.emitFilters.next(data);
  }

  changeMapView() {
    this.sateliteView = !this.sateliteView;

    this.service.emitMapView.next(this.sateliteView);
  }

  isMap: boolean = true;
  getSelectedTab() {
    console.log('Selected');
    // if (this.tabRef.getSelected().tabTitle == "Map") {
    //   this.isMap = true;
    // } else if (this.tabRef.getSelected().tabTitle == "List") {
    //   this.isMap = false;
    // }
  }

  async filterModal() {
    // console.log(this.tabRef.getSelected());
    let filterModal = await this.modalCtrl.create({
      component: FilterModalComponent,
      cssClass: "asasa-modal",
    });
    filterModal.onDidDismiss().then((data: any) => {
      if (data.data) {
        this.filterService.filteredAds = [];

        this.filter(data.data.filter);
      }
    });
    filterModal.present();
  }

  public async filter(filter) {
    if (
      (filter.minPrice && filter.minPrice != 0) ||
      (filter.maxPrice && filter.maxPrice != 0) ||
      (filter.minArea && filter.minArea != 0) ||
      (filter.maxArea && filter.maxArea != 0)
    ) {
      if (this.service.searchParams) {
        if (
          this.service.searchParams.location ||
          this.service.searchParams.city ||
          this.service.searchParams.type != "all" ||
          this.service.searchParams.subType
        ) {
          this.filterService.filterByPriceAndArea(
            filter,
            this.filterService.processedData
          );
        } else if (
          !this.service.searchParams.location &&
          !this.service.searchParams.city &&
          this.service.searchParams.type == "all" &&
          !this.service.searchParams.subType
        ) {
          this.filterService.filterByPriceAndArea(
            filter,
            this.filterService.processingData
          );
        }
      } else if (!this.service.searchParams) {
        this.filterService.filterByPriceAndArea(
          filter,
          this.filterService.processingData
        );
      }
    }
  }

  public getAdsData() {
    this.service.emitLoader.next("emittingAds");

    this.service.getAds().subscribe((res) => {
      var response = res.property.reverse();
      this.filterService.processingData = response;
      this.filterService.processingDataWithPurpsoe = response;
      this.filterService.filterByPurpose();

      if (this.filterService.processedData) {
        this.outputAds(this.filterService.processedData);
      } else {
        this.outputAds(this.filterService.filterByPurpose());
      }
    });
  }
}
