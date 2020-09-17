import { Component, OnInit } from "@angular/core";
import {
  NavController,
  MenuController,
  Platform,
} from "@ionic/angular";
import { FilterService } from "../../app/services/filterService";

@Component({
  selector: 'app-favourite-ads',
  templateUrl: './favourite-ads.page.html',
  styleUrls: ['./favourite-ads.page.scss'],
})
export class FavouriteAdsPage implements OnInit {
  processingData: any;
  ads: any = [];
  constructor(
    public navCtrl: NavController,
    private menuCtrl: MenuController,
    private service: FilterService,
    platform: Platform
  ) {
    platform.backButton.subscribe(() => {
      this.navCtrl.pop();
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    console.log("ionViewDidLoad FavouriteAdsPage");
    this.menuCtrl.close();

    this.processingData = this.service.processingData;
    if(this.processingData) {
    // console.log(this.processingData);
    this.processingData.forEach((item, index) => {
      // console.log(item);
      this.processingData[index]["fav"] = false;
      if (localStorage.getItem("favourites"))
        if (JSON.parse(localStorage.getItem("favourites")).length > 0) {
          if (
            JSON.parse(localStorage.getItem("favourites")).includes(
              JSON.stringify(item._id)
            )
          ) {
            this.processingData[index]["fav"] = true;
            this.ads.push(this.processingData[index]);
          }
        }
    });
    }
  }
}
