import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgSelectModule } from "@ng-select/ng-select";

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { AdsModule } from "../ads/ads.module";
import { PipesModule } from "../../pipes/pipes.module";
import { FavouriteAdsPageModule } from "../favourite-ads/favourite-ads.module";
import { HomeSearchModalPage } from "./home-components/search/search-modal";
import { ArchitectPageModule } from "./../architect/architect.module";
import { HomeComponentPage } from "./home-components/home-component";
import { ProjectsPageModule } from "../projects/projects.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PipesModule,
    AdsModule,
    FavouriteAdsPageModule,
    NgSelectModule,
    ArchitectPageModule,
    ProjectsPageModule
  ],
  declarations: [HomePage, HomeSearchModalPage],
  entryComponents: [HomePage, HomeSearchModalPage]
})
export class HomePageModule {}
